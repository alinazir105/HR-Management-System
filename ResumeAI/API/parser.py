import os
from pdfminer.high_level import extract_text
import docx  # python-docx

def parse_resume(filepath):
    ext = os.path.splitext(filepath)[1].lower()

    try:
        if ext == '.pdf':
            text = extract_text(filepath)
        elif ext == '.docx':
            doc = docx.Document(filepath)
            text = "\n".join([para.text for para in doc.paragraphs])
        else:
            raise ValueError("Unsupported file format. Only .pdf and .docx are supported.")

        return text.strip()
    except Exception as e:
        raise ValueError(f"Failed to extract text: {str(e)}")
