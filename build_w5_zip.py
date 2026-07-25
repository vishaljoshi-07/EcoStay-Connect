import os
import zipfile

def create_w5_zip():
    zip_name = "W5_Submission_26101252.zip"
    diagram_pdf = "W5_SchemaDiagram_26101252.pdf"
    diagram_png = "W5_SchemaDiagram_26101252.png"
    crud_pdf = "W5_CRUDVerification_26101252.pdf"

    print(f"Creating {zip_name}...")
    
    files_to_add = []
    
    # Add Diagram (Support both PDF and PNG formats)
    if os.path.exists(diagram_pdf):
        files_to_add.append(diagram_pdf)
    elif os.path.exists(diagram_png):
        files_to_add.append(diagram_png)
    else:
        print(f"Warning: Neither {diagram_pdf} nor {diagram_png} was found!")
        
    # Add CRUD Verification Report
    if os.path.exists(crud_pdf):
        files_to_add.append(crud_pdf)
    else:
        print(f"Warning: {crud_pdf} was not found!")

    if not files_to_add:
        print("Error: No files found to include in the ZIP!")
        return

    with zipfile.ZipFile(zip_name, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for file in files_to_add:
            zipf.write(file, os.path.basename(file))
            print(f"Added: {os.path.basename(file)}")

    print(f"\nSuccessfully created {zip_name} with the required visual structures!")

if __name__ == "__main__":
    create_w5_zip()
