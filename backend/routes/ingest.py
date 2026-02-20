from fastapi import APIRouter, UploadFile, File, Depends
from ingestion.ingest_pdf import ingest_pdf
import uuid
import os
from datetime import datetime
from utils.auth import require_role

router = APIRouter(prefix="/ingest", tags=["Ingestion"])

UPLOAD_DIR = "uploads"

# In-memory storage for uploaded documents (replace with database in production)
uploaded_documents = []

@router.post("")
async def ingest_document(
    file: UploadFile = File(...),
    current_user: dict = Depends(require_role(["faculty", "admin"]))
):
    """Upload and ingest a document. Only faculty and admin can upload."""
    os.makedirs(UPLOAD_DIR, exist_ok=True)

    file_id = str(uuid.uuid4())
    original_filename = file.filename
    file_path = f"{UPLOAD_DIR}/{file_id}_{original_filename}"

    with open(file_path, "wb") as f:
        f.write(await file.read())

    ingest_pdf(
        pdf_path=file_path,
        persist_directory="vectorstore"
    )

    # Store document metadata with actual uploader info
    document_info = {
        "document_id": file_id,
        "document_name": original_filename,
        "document_url": f"/{file_path}",
        "uploader": {
            "id": current_user.get("id", current_user.get("_id")),
            "name": current_user.get("name"),
            "email": current_user.get("email")
        },
        "uploaded_at": datetime.now().isoformat()
    }
    uploaded_documents.append(document_info)

    return {
        "message": "Document ingested successfully",
        **document_info
    }

@router.get("/documents")
async def get_uploaded_documents():
    """Get list of all uploaded documents - accessible to students"""
    return {
        "documents": uploaded_documents,
        "count": len(uploaded_documents)
    }
