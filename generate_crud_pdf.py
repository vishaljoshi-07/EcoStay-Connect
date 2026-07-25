import os
import subprocess
import time
import json
import urllib.request
from fpdf import FPDF

# Configuration
PORT_FRONTEND = 5173
URL_FRONTEND = f"http://localhost:{PORT_FRONTEND}"
URL_BACKEND = "http://localhost:5000/api/homestays"
INTERN_ID = "26101252"
PROJECT_NAME = "EcoStay Connect"
PDF_NAME = "W5_CRUDVerification_26101252.pdf"
EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

temp_dir = os.environ.get('TEMP', 'C:\\Users\\VISHAL\\AppData\\Local\\Temp')
img_create = os.path.join(temp_dir, 'w5_create.png')
img_read = os.path.join(temp_dir, 'w5_read.png')
img_update = os.path.join(temp_dir, 'w5_update.png')
img_delete = os.path.join(temp_dir, 'w5_delete.png')

def start_frontend_server():
    print("Checking if Vite server is already running...")
    try:
        urllib.request.urlopen(URL_FRONTEND, timeout=1)
        print("Vite server is already running.")
        return None
    except Exception:
        print("Vite server not detected. Starting Vite server on port 5173...")
        # Start Vite using npx to bypass execution policy blocks
        process = subprocess.Popen(
            "npx vite --port 5173",
            shell=True,
            cwd=os.getcwd(),
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL
        )
        # Wait for port to become active
        for _ in range(15):
            try:
                time.sleep(1.5)
                urllib.request.urlopen(URL_FRONTEND, timeout=1)
                print("Vite server successfully started!")
                return process
            except Exception:
                pass
        print("Warning: Timed out waiting for Vite server to start.")
        return process

def wait_for_backend():
    print("Checking if Backend server is running...")
    for _ in range(10):
        try:
            urllib.request.urlopen("http://localhost:5000/", timeout=1)
            print("Backend server is active!")
            return True
        except Exception:
            time.sleep(1.5)
    print("Error: Backend server is not running on port 5000.")
    return False

def make_api_request(url, method='GET', data=None):
    req = urllib.request.Request(url, method=method)
    req.add_header('Content-Type', 'application/json')
    
    body = None
    if data:
        body = json.dumps(data).encode('utf-8')
        
    try:
        with urllib.request.urlopen(req, data=body, timeout=5) as response:
            res_data = response.read().decode('utf-8')
            return json.loads(res_data)
    except Exception as e:
        print(f"API Request Error ({method} {url}): {e}")
        return None

def capture_screenshot(url, output_path, width=1440, height=900):
    args = [
        EDGE_PATH,
        '--headless=new',
        '--disable-gpu',
        '--no-sandbox',
        f'--screenshot={output_path}',
        f'--window-size={width},{height}',
        url
    ]
    print(f"Capturing {url} ({width}x{height}) -> {output_path}...")
    subprocess.run(args, check=True)
    time.sleep(1.5)

# PDF Generation Class
class VerificationPDF(FPDF):
    def header(self):
        if self.page_no() > 1:
            self.set_font('helvetica', 'I', 8)
            self.set_text_color(100, 100, 100)
            self.cell(0, 10, f'Week 5 Database CRUD Verification - {PROJECT_NAME}', border=0, align='R')
            self.ln(10)

    def footer(self):
        if self.page_no() > 1:
            self.set_y(-15)
            self.set_font('helvetica', 'I', 8)
            self.set_text_color(100, 100, 100)
            self.cell(0, 10, f'Page {self.page_no()}', border=0, align='C')

def create_report():
    print("\nCompiling Verification PDF report...")
    pdf = VerificationPDF()
    pdf.set_margins(25.4, 25.4, 25.4) # 1-inch margins
    pdf.alias_nb_pages()
    
    # 1. COVER PAGE
    pdf.add_page()
    pdf.set_fill_color(6, 95, 70)  # Forest Green / Emerald 800
    pdf.rect(0, 0, 210, 20, 'F')
    
    pdf.ln(50)
    pdf.set_font('helvetica', 'B', 24)
    pdf.set_text_color(15, 23, 42) # Slate 900
    pdf.multi_cell(0, 12, "MongoDB Atlas Integration\n& CRUD Verification Report", align='C')
    
    pdf.ln(15)
    pdf.set_font('helvetica', '', 14)
    pdf.set_text_color(71, 85, 105) # Slate 600
    pdf.cell(0, 10, f"Project: {PROJECT_NAME}", ln=True, align='C')
    pdf.cell(0, 10, f"Intern ID: {INTERN_ID}", ln=True, align='C')
    
    pdf.ln(60)
    pdf.set_font('helvetica', 'I', 10)
    pdf.set_text_color(100, 100, 100)
    pdf.cell(0, 10, f"Generated automatically on: {time.strftime('%Y-%m-%d %H:%M:%S')}", align='C')
    
    # Screenshots list with details
    screenshots = [
        (img_create, "Figure 1: A new record was successfully created and stored in MongoDB."),
        (img_read, "Figure 2: Records retrieved successfully from MongoDB and displayed in the application."),
        (img_update, "Figure 3: Existing record updated successfully in MongoDB."),
        (img_delete, "Figure 4: Record removed successfully from MongoDB.")
    ]
    
    # Write page for each screenshot
    for img_path, caption in screenshots:
        pdf.add_page()
        pdf.ln(10)
        
        # Center the image within page width (210mm - 2 * 25.4mm margin = 159.2mm printable width)
        # Image width 150mm fits nicely
        pdf.image(img_path, x=30, y=40, w=150)
        
        # Move Y cursor down past the image
        pdf.set_y(150)
        pdf.set_font('helvetica', 'I', 11)
        pdf.set_text_color(15, 23, 42)
        pdf.multi_cell(0, 10, caption, align='C')
        
    pdf.output(PDF_NAME)
    print(f"Successfully generated {PDF_NAME}!")

def main():
    if not wait_for_backend():
        return
        
    vite_proc = start_frontend_server()
    
    try:
        # 1. READ Initial State (Read operation)
        # We capture this to show loaded list of records
        capture_screenshot(URL_FRONTEND, img_read)
        
        # 2. CREATE operation
        # Add a new homestay via REST API
        new_stay = {
            "title": "Kailash View Eco-Lodge",
            "location": "Kalpa, Himachal Pradesh",
            "description": "A high-altitude mud and wood sanctuary with direct views of the sacred peak.",
            "price": 4200,
            "rating": 4.9,
            "reviewsCount": 12,
            "image": "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=800&q=80",
            "ecoFeatures": ["Solar Power", "Zero Waste"],
            "ownerName": "Dorje Negi",
            "availability": True
        }
        print("Performing CREATE operation via API...")
        res_create = make_api_request(URL_BACKEND, method='POST', data=new_stay)
        if not res_create or not res_create.get('success'):
            print("Error creating homestay!")
            return
            
        new_stay_id = res_create['data']['_id']
        print(f"Created Homestay with ID: {new_stay_id}")
        
        # Capture the Home Screen showing the newly created listing card
        # Refresh is simulated by reopening URL
        capture_screenshot(URL_FRONTEND, img_create)
        
        # 3. UPDATE operation
        # Update the price to 4800
        update_data = {
            "price": 4800
        }
        print("Performing UPDATE operation via API...")
        res_update = make_api_request(f"{URL_BACKEND}/{new_stay_id}", method='PUT', data=update_data)
        if not res_update or not res_update.get('success'):
            print("Error updating homestay!")
            return
            
        # Capture the screen displaying the updated price
        capture_screenshot(URL_FRONTEND, img_update)
        
        # 4. DELETE operation
        print("Performing DELETE operation via API...")
        res_delete = make_api_request(f"{URL_BACKEND}/{new_stay_id}", method='DELETE')
        if not res_delete or not res_delete.get('success'):
            print("Error deleting homestay!")
            return
            
        # Capture the screen showing the listing has been deleted
        capture_screenshot(URL_FRONTEND, img_delete)
        
        # Generate the final PDF
        create_report()
        
    finally:
        # Gracefully shut down the Vite dev server if we started it
        if vite_proc:
            print("Stopping local Vite server...")
            vite_proc.terminate()
            vite_proc.wait()

if __name__ == "__main__":
    main()
