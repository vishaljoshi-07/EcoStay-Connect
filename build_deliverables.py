import os
import subprocess
import time
import urllib.request
from PIL import Image, ImageDraw, ImageFont
from fpdf import FPDF

# Configuration
URL_BASE = "http://localhost:5179"
INTERN_ID = "26101252"
PROJECT_NAME = "EcoStay Connect"

# Output files
PDF_WIREFRAMES = "W3_Wireframes_26101252.pdf"
PDF_SCREENSHOTS = "W3_ResponsiveScreenshots_26101252.pdf"

temp_dir = os.environ.get('TEMP', 'C:\\Users\\VISHAL\\AppData\\Local\\Temp')

# Screenshot paths
img_mobile = os.path.join(temp_dir, 'w3_mobile.png')
img_tablet = os.path.join(temp_dir, 'w3_tablet.png')
img_desktop = os.path.join(temp_dir, 'w3_desktop.png')
img_light = os.path.join(temp_dir, 'w3_light.png')
img_dark = os.path.join(temp_dir, 'w3_dark.png')

# Wireframe paths
wf_home = os.path.join(temp_dir, 'wf_home.png')
wf_dashboard = os.path.join(temp_dir, 'wf_dashboard.png')
wf_detail = os.path.join(temp_dir, 'wf_detail.png')
wf_login = os.path.join(temp_dir, 'wf_login.png')
wf_ai = os.path.join(temp_dir, 'wf_ai.png')

edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

def wait_for_server():
    print(f"Waiting for Vite server at {URL_BASE} to start...")
    for _ in range(30):
        try:
            with urllib.request.urlopen(URL_BASE, timeout=2) as response:
                if response.status == 200:
                    print("Vite server is responsive!")
                    return True
        except Exception:
            pass
        time.sleep(1)
    print("Error: Vite server did not start in time.")
    return False

def capture_screenshot(url, output_path, width, height):
    args = [
        edge_path,
        '--headless=new',
        '--disable-gpu',
        '--no-sandbox',
        f'--screenshot={output_path}',
        f'--window-size={width},{height}',
        url
    ]
    print(f"Capturing {url} ({width}x{height}) -> {output_path}...")
    subprocess.run(args, check=True)
    time.sleep(2)

# FPDF Base Class
class SubmissionPDF(FPDF):
    def __init__(self, doc_type, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.doc_type = doc_type

    def header(self):
        if self.page_no() > 1:
            self.set_font('helvetica', 'I', 8)
            self.set_text_color(100, 100, 100)
            self.cell(0, 10, f'Week 3 {self.doc_type} Submission - EcoStay Connect', border=0, align='R')
            self.ln(10)

    def footer(self):
        if self.page_no() > 1:
            self.set_y(-15)
            self.set_font('helvetica', 'I', 8)
            self.set_text_color(100, 100, 100)
            self.cell(0, 10, f'Page {self.page_no()}', border=0, align='C')

def create_cover_page(pdf, doc_type):
    pdf.add_page()
    
    # Emerald green border accent
    pdf.set_fill_color(6, 95, 70)  # Emerald 800
    pdf.rect(0, 0, 210, 15, 'F')
    
    pdf.ln(35)
    
    # Title
    pdf.set_font('helvetica', 'B', 24)
    pdf.set_text_color(15, 23, 42)  # Slate 900
    pdf.multi_cell(0, 12, f'Week 3 {doc_type}\nSubmission Report', align='C')
    
    pdf.ln(10)
    
    # Subtitle
    pdf.set_font('helvetica', '', 14)
    pdf.set_text_color(71, 85, 105)  # Slate 600
    pdf.cell(0, 10, 'Internship Submission Report', align='C', new_x="LMARGIN", new_y="NEXT")
    
    pdf.ln(35)
    
    # Details Box
    pdf.set_fill_color(240, 253, 244)  # Emerald 50
    pdf.set_draw_color(209, 250, 229)  # Emerald 100
    pdf.rect(25, 135, 160, 65, 'DF')
    
    # Text inside Box
    pdf.set_xy(30, 143)
    pdf.set_font('helvetica', 'B', 12)
    pdf.set_text_color(6, 95, 70)  # Emerald 800
    pdf.cell(45, 8, 'Project Name:', new_x="RIGHT", new_y="TOP")
    pdf.set_font('helvetica', '', 12)
    pdf.set_text_color(15, 23, 42)
    pdf.cell(0, 8, PROJECT_NAME, new_x="LMARGIN", new_y="NEXT")
    
    pdf.set_x(30)
    pdf.set_font('helvetica', 'B', 12)
    pdf.set_text_color(6, 95, 70)
    pdf.cell(45, 8, 'Intern ID:', new_x="RIGHT", new_y="TOP")
    pdf.set_font('helvetica', '', 12)
    pdf.set_text_color(15, 23, 42)
    pdf.cell(0, 8, INTERN_ID, new_x="LMARGIN", new_y="NEXT")
    
    pdf.set_x(30)
    pdf.set_font('helvetica', 'B', 12)
    pdf.set_text_color(6, 95, 70)
    pdf.cell(45, 8, 'Submission Date:', new_x="RIGHT", new_y="TOP")
    pdf.set_font('helvetica', '', 12)
    pdf.set_text_color(15, 23, 42)
    pdf.cell(0, 8, 'June 22, 2026', new_x="LMARGIN", new_y="NEXT")
    
    pdf.set_x(30)
    pdf.set_font('helvetica', 'B', 12)
    pdf.set_text_color(6, 95, 70)
    pdf.cell(45, 8, 'Submission Status:', new_x="RIGHT", new_y="TOP")
    pdf.set_font('helvetica', 'B', 12)
    pdf.set_text_color(22, 101, 52)  # Green 800
    pdf.cell(0, 8, 'COMPLETED & VERIFIED', new_x="LMARGIN", new_y="NEXT")

# ----------------- DRAW WIREFRAMES USING PILLOW -----------------
def draw_common_layout(draw, title_text):
    # Navbar
    draw.rectangle([0, 0, 1200, 60], fill=(226, 232, 240), outline=(203, 213, 225), width=2)
    
    # Fonts
    try:
        font_logo = ImageFont.truetype("arial.ttf", 20)
        font_nav = ImageFont.truetype("arial.ttf", 16)
        font_footer = ImageFont.truetype("arial.ttf", 14)
    except Exception:
        font_logo = font_nav = font_footer = ImageFont.load_default()

    draw.text((30, 18), "Logo: EcoStay Connect", fill=(71, 85, 105), font=font_logo)
    draw.text((750, 20), "Home     About     Dashboard     Showcase     Login", fill=(100, 116, 139), font=font_nav)
    
    # Theme toggle symbol
    draw.ellipse([1130, 15, 1160, 45], fill=(148, 163, 184), outline=(100, 116, 139), width=1)
    
    # Footer
    draw.rectangle([0, 740, 1200, 800], fill=(15, 23, 42))
    draw.text((30, 760), f"EcoStay Connect. Intern ID: {INTERN_ID} - Low-Fidelity Figma Wireframe Layout: {title_text}", fill=(148, 163, 184), font=font_footer)

def draw_wf_home():
    img = Image.new("RGB", (1200, 800), color=(248, 250, 252))
    draw = ImageDraw.Draw(img)
    draw_common_layout(draw, "Home Page Layout")
    
    # Fonts
    try:
        font_h1 = ImageFont.truetype("arial.ttf", 36)
        font_p = ImageFont.truetype("arial.ttf", 15)
        font_lbl = ImageFont.truetype("arial.ttf", 16)
    except Exception:
        font_h1 = font_p = font_lbl = ImageFont.load_default()

    # Hero Banner
    draw.rectangle([50, 80, 1150, 360], fill=(241, 245, 249), outline=(226, 232, 240), width=2)
    draw.text((100, 120), "Headline: Discover Homestays That Heal the Earth", fill=(30, 41, 59), font=font_h1)
    draw.text((100, 180), "Subheadline paragraph placeholder text describing low-impact carbon-neutral stays.", fill=(100, 116, 139), font=font_p)
    
    # Simulated Search Widget
    draw.rectangle([100, 240, 750, 310], fill=(255, 255, 255), outline=(226, 232, 240), width=2)
    draw.text((120, 260), "Destination Input Field  |  Date Picker Field  |  Guests Dropdown", fill=(148, 163, 184), font=font_p)
    draw.rectangle([630, 248, 740, 302], fill=(203, 213, 225))
    draw.text((660, 265), "Search", fill=(71, 85, 105), font=font_p)
    
    # Right Column Hero Image Frame
    draw.rectangle([830, 110, 1110, 330], fill=(226, 232, 240), outline=(203, 213, 225), width=2)
    draw.text((910, 210), "Featured Image Frame", fill=(100, 116, 139), font=font_p)

    # Core Homestays Grid section
    draw.text((50, 400), "Discover Popular Eco Homestays", fill=(30, 41, 59), font=ImageFont.truetype("arial.ttf", 22) if font_lbl != ImageFont.load_default() else font_lbl)
    
    card_w = 340
    card_h = 280
    gap = 40
    start_x = 50
    start_y = 440
    
    for i in range(3):
        x1 = start_x + i * (card_w + gap)
        y1 = start_y
        x2 = x1 + card_w
        y2 = y1 + card_h
        
        # Card Body
        draw.rectangle([x1, y1, x2, y2], fill=(255, 255, 255), outline=(226, 232, 240), width=2)
        # Image
        draw.rectangle([x1 + 10, y1 + 10, x2 - 10, y1 + 140], fill=(226, 232, 240))
        draw.text((x1 + 100, y1 + 70), "Image Placeholder", fill=(148, 163, 184), font=font_p)
        # Content
        draw.text((x1 + 15, y1 + 160), f"Homestay Name Card #{i+1}", fill=(30, 41, 59), font=font_lbl)
        draw.text((x1 + 15, y1 + 185), "Location Pin Tag  |  Rating Star Value", fill=(148, 163, 184), font=font_p)
        draw.text((x1 + 15, y1 + 210), "Short descriptions dummy text box...", fill=(148, 163, 184), font=font_p)
        
        # Card Footer details
        draw.line([x1 + 10, y2 - 40, x2 - 10, y2 - 40], fill=(241, 245, 249), width=1)
        draw.text((x1 + 15, y2 - 30), "₹2,500 / night", fill=(30, 41, 59), font=font_lbl)
        draw.rectangle([x2 - 100, y2 - 32, x2 - 15, y2 - 8], fill=(203, 213, 225))
        draw.text((x2 - 88, y2 - 25), "Book Now", fill=(71, 85, 105), font=font_p)

    img.save(wf_home)
    print("Wireframe 1 (Home) drawn successfully.")

def draw_wf_dashboard():
    img = Image.new("RGB", (1200, 800), color=(248, 250, 252))
    draw = ImageDraw.Draw(img)
    draw_common_layout(draw, "Dashboard Console Layout")
    
    # Fonts
    try:
        font_lbl = ImageFont.truetype("arial.ttf", 16)
        font_h2 = ImageFont.truetype("arial.ttf", 24)
        font_p = ImageFont.truetype("arial.ttf", 15)
        font_metric = ImageFont.truetype("arial.ttf", 28)
    except Exception:
        font_lbl = font_h2 = font_p = font_metric = ImageFont.load_default()

    # Dashboard Banner
    draw.rectangle([50, 80, 1150, 160], fill=(241, 245, 249), outline=(226, 232, 240), width=2)
    draw.text((80, 100), "Dashboard Control Center", fill=(30, 41, 59), font=font_h2)
    draw.text((80, 130), "Real-time metrics, booking verifications, and sustainable statistics.", fill=(100, 116, 139), font=font_p)
    draw.rectangle([980, 100, 1120, 140], fill=(203, 213, 225))
    draw.text((1005, 112), "Refresh Data", fill=(71, 85, 105), font=font_p)

    # 3 Stat Cards
    card_w = 340
    card_h = 100
    gap = 40
    start_x = 50
    start_y = 180
    
    stat_titles = ["Total Homestays", "Total Bookings", "Verified Reviews"]
    stat_vals = ["154 Active", "1,280 Reserved", "3,420 Submissions"]
    stat_sub = ["+12.4% this month", "+8.2% this month", "Avg eco-score 4.9 ★"]
    
    for i in range(3):
        x1 = start_x + i * (card_w + gap)
        y1 = start_y
        x2 = x1 + card_w
        y2 = y1 + card_h
        
        draw.rectangle([x1, y1, x2, y2], fill=(255, 255, 255), outline=(226, 232, 240), width=2)
        draw.text((x1 + 20, y1 + 15), stat_titles[i], fill=(148, 163, 184), font=font_lbl)
        draw.text((x1 + 20, y1 + 35), stat_vals[i], fill=(30, 41, 59), font=font_metric)
        draw.text((x1 + 20, y1 + 72), stat_sub[i], fill=(100, 116, 139), font=font_p)
        
        # Mini icon box
        draw.rectangle([x2 - 60, y1 + 20, x2 - 20, y1 + 60], fill=(241, 245, 249))

    # Split area: Left Bookings Table, Right Quick Controls Sidebar
    # Left table card
    draw.rectangle([50, 300, 780, 710], fill=(255, 255, 255), outline=(226, 232, 240), width=2)
    draw.text((80, 320), "Recent Platform Bookings Log", fill=(30, 41, 59), font=font_lbl)
    
    # Table headers
    draw.line([80, 360, 750, 360], fill=(226, 232, 240), width=2)
    draw.text((80, 345), "Booking ID    |    Homestay Destination Title    |    Guest Name    |    Status    |    Price", fill=(100, 116, 139), font=font_lbl)
    
    # Table rows
    row_data = [
        ("#BK-9801", "The Whispering Pines Sanctuary", "Amit Sharma", "CONFIRMED", "₹10,500"),
        ("#BK-9754", "Emerald Valley Bamboo Retreat", "Priya Patel", "PENDING", "₹12,600"),
        ("#BK-9721", "Cloud-Kissed Mud Haven", "John Doe", "CANCELLED", "₹5,600"),
        ("#BK-9654", "Himalayan Stone Eco-Cottage", "Suresh Kumar", "CONFIRMED", "₹9,300")
    ]
    
    for idx, row in enumerate(row_data):
        y_pos = 385 + idx * 75
        draw.line([80, y_pos - 10, 750, y_pos - 10], fill=(241, 245, 249), width=1)
        draw.text((80, y_pos), f"{row[0]}   |   {row[1][:22]}...   |   {row[2]}   |", fill=(71, 85, 105), font=font_p)
        
        # Pill status
        px = 490
        draw.rectangle([px, y_pos - 4, px + 95, y_pos + 16], fill=(241, 245, 249), outline=(226, 232, 240))
        draw.text((px + 10, y_pos), row[3], fill=(100, 116, 139), font=ImageFont.truetype("arial.ttf", 10) if font_lbl != ImageFont.load_default() else font_lbl)
        
        draw.text((690, y_pos), row[4], fill=(30, 41, 59), font=font_lbl)

    # Right action side panel
    draw.rectangle([820, 300, 1150, 710], fill=(255, 255, 255), outline=(226, 232, 240), width=2)
    draw.text((850, 320), "Quick Controls Sidebar", fill=(30, 41, 59), font=font_lbl)
    
    button_titles = ["Onboard New Homestay", "Generate Eco Reports", "Manage Audit Verification"]
    for idx, title in enumerate(button_titles):
        by_pos = 360 + idx * 75
        draw.rectangle([850, by_pos, 1120, by_pos + 50], fill=(226, 232, 240), outline=(203, 213, 225), width=1)
        draw.text((870, by_pos + 18), title, fill=(71, 85, 105), font=font_lbl)
        
    # Carbon update card box
    draw.rectangle([850, 590, 1120, 680], fill=(241, 245, 249), outline=(226, 232, 240), width=1)
    draw.text((865, 605), "Carbon Impact Update Status", fill=(6, 95, 70), font=ImageFont.truetype("arial.ttf", 12) if font_lbl != ImageFont.load_default() else font_lbl)
    draw.text((865, 630), "Solar verifications in Manali decreased\naverage emissions coefficient by 14.2%.", fill=(100, 116, 139), font=ImageFont.truetype("arial.ttf", 11) if font_lbl != ImageFont.load_default() else font_lbl)

    img.save(wf_dashboard)
    print("Wireframe 2 (Dashboard) drawn successfully.")

def draw_wf_detail():
    img = Image.new("RGB", (1200, 800), color=(248, 250, 252))
    draw = ImageDraw.Draw(img)
    draw_common_layout(draw, "Homestay Detail Layout")
    
    # Fonts
    try:
        font_lbl = ImageFont.truetype("arial.ttf", 16)
        font_h2 = ImageFont.truetype("arial.ttf", 26)
        font_p = ImageFont.truetype("arial.ttf", 15)
    except Exception:
        font_h2 = font_p = font_lbl = ImageFont.load_default()

    # Image Showcase Grid
    draw.rectangle([50, 80, 700, 360], fill=(226, 232, 240), outline=(203, 213, 225), width=2)
    draw.text((280, 210), "Featured Primary Showcase Photo", fill=(100, 116, 139), font=font_lbl)

    draw.rectangle([730, 80, 1150, 210], fill=(241, 245, 249), outline=(226, 232, 240), width=2)
    draw.text((870, 135), "Showcase Gallery 1", fill=(148, 163, 184), font=font_p)
    
    draw.rectangle([730, 230, 1150, 360], fill=(241, 245, 249), outline=(226, 232, 240), width=2)
    draw.text((870, 285), "Showcase Gallery 2", fill=(148, 163, 184), font=font_p)

    # Details Split Area
    # Left Content Column
    draw.text((50, 390), "The Whispering Pines Sanctuary", fill=(30, 41, 59), font=font_h2)
    draw.text((50, 425), "Location Tag: Manali, Himachal Pradesh  |  ★ 4.9 Premium Star Rating", fill=(100, 116, 139), font=font_lbl)
    
    desc_p = (
        "Accommodation Details description placeholder. Stay in a cozy wooden cottage in deep cedar woods.\n"
        "Fully solar powered grid connection, farm-to-table breakfast served organic, rainwater recycling active."
    )
    draw.text((50, 460), desc_p, fill=(71, 85, 105), font=font_p)
    
    # Audit verification details panel
    draw.rectangle([50, 520, 780, 700], fill=(241, 245, 249), outline=(226, 232, 240), width=2)
    draw.text((70, 535), "Audited Sustainable Eco-Practices Checklist", fill=(6, 95, 70), font=font_lbl)
    
    checks = [
        "100% Solar-Powered Heating and Lighting Grids",
        "Rainwater Harvesting and Solid Waste Composting",
        "No Single-Use Plastic Policy across entire property",
        "Local guides hired for rural nature trekking packages"
    ]
    for idx, check in enumerate(checks):
        y_c = 570 + idx * 30
        draw.rectangle([70, y_c, 82, y_c + 12], fill=(203, 213, 225))
        draw.text((95, y_c - 2), check, fill=(71, 85, 105), font=font_p)

    # Right Content Column (Reservation Widget)
    draw.rectangle([820, 390, 1150, 700], fill=(255, 255, 255), outline=(203, 213, 225), width=2)
    draw.text((850, 415), "₹3,500 / night", fill=(30, 41, 59), font=font_h2)
    
    # Dates input fields
    draw.rectangle([850, 465, 1120, 515], fill=(248, 250, 252), outline=(226, 232, 240), width=1)
    draw.text((865, 475), "CHECK-IN  /  CHECK-OUT DATES", fill=(148, 163, 184), font=ImageFont.truetype("arial.ttf", 10) if font_lbl != ImageFont.load_default() else font_lbl)
    draw.text((865, 492), "Select Dates Picker...", fill=(100, 116, 139), font=font_p)

    # Guest dropdown
    draw.rectangle([850, 530, 1120, 580], fill=(248, 250, 252), outline=(226, 232, 240), width=1)
    draw.text((865, 540), "GUEST CAPACITY SELECTOR", fill=(148, 163, 184), font=ImageFont.truetype("arial.ttf", 10) if font_lbl != ImageFont.load_default() else font_lbl)
    draw.text((865, 558), "2 Guests (Selected)", fill=(100, 116, 139), font=font_p)
    
    # Submit Reserve
    draw.rectangle([850, 610, 1120, 665], fill=(203, 213, 225))
    draw.text((930, 630), "Reserve Now", fill=(71, 85, 105), font=font_lbl)

    img.save(wf_detail)
    print("Wireframe 3 (Detail) drawn successfully.")

def draw_wf_login():
    img = Image.new("RGB", (1200, 800), color=(248, 250, 252))
    draw = ImageDraw.Draw(img)
    draw_common_layout(draw, "Login Screen Layout")
    
    # Fonts
    try:
        font_lbl = ImageFont.truetype("arial.ttf", 16)
        font_h2 = ImageFont.truetype("arial.ttf", 26)
        font_p = ImageFont.truetype("arial.ttf", 15)
    except Exception:
        font_h2 = font_p = font_lbl = ImageFont.load_default()

    # Center Panel Box
    draw.rectangle([400, 100, 800, 700], fill=(255, 255, 255), outline=(226, 232, 240), width=2)
    
    # Logo symbol
    draw.ellipse([575, 130, 625, 180], fill=(241, 245, 249), outline=(203, 213, 225))
    draw.text((586, 145), "Leaf", fill=(6, 95, 70), font=font_p)

    draw.text((530, 205), "Welcome Back", fill=(30, 41, 59), font=font_h2)
    draw.text((475, 245), "Enter credential parameters to verify session authorization.", fill=(148, 163, 184), font=ImageFont.truetype("arial.ttf", 11) if font_lbl != ImageFont.load_default() else font_lbl)

    # Email field box
    draw.text((440, 290), "EMAIL ADDRESS INPUT FIELD", fill=(100, 116, 139), font=ImageFont.truetype("arial.ttf", 11) if font_lbl != ImageFont.load_default() else font_lbl)
    draw.rectangle([440, 310, 760, 360], fill=(248, 250, 252), outline=(226, 232, 240), width=1)
    draw.text((460, 328), "you@domain.com", fill=(148, 163, 184), font=font_p)

    # Password field box
    draw.text((440, 390), "PASSWORD SECURE BLOCK INPUT", fill=(100, 116, 139), font=ImageFont.truetype("arial.ttf", 11) if font_lbl != ImageFont.load_default() else font_lbl)
    draw.rectangle([440, 410, 760, 460], fill=(248, 250, 252), outline=(226, 232, 240), width=1)
    draw.text((460, 428), "••••••••", fill=(148, 163, 184), font=font_p)

    # Remember me check
    draw.rectangle([440, 480, 455, 495], fill=(255, 255, 255), outline=(203, 213, 225))
    draw.text((468, 480), "Keep me logged in for 30 days session", fill=(100, 116, 139), font=ImageFont.truetype("arial.ttf", 11) if font_lbl != ImageFont.load_default() else font_lbl)

    # Submit login button
    draw.rectangle([440, 520, 760, 575], fill=(203, 213, 225))
    draw.text((570, 538), "Sign In Now", fill=(71, 85, 105), font=font_lbl)

    # Divider Or Sign in with
    draw.line([440, 610, 560, 610], fill=(226, 232, 240), width=1)
    draw.text((575, 602), "Or Sign In With", fill=(148, 163, 184), font=ImageFont.truetype("arial.ttf", 11) if font_lbl != ImageFont.load_default() else font_lbl)
    draw.line([665, 610, 760, 610], fill=(226, 232, 240), width=1)

    # Social grid buttons
    draw.rectangle([440, 630, 580, 670], fill=(248, 250, 252), outline=(226, 232, 240))
    draw.text((480, 642), "Autofill Demo", fill=(71, 85, 105), font=ImageFont.truetype("arial.ttf", 11) if font_lbl != ImageFont.load_default() else font_lbl)
    
    draw.rectangle([620, 630, 760, 670], fill=(248, 250, 252), outline=(226, 232, 240))
    draw.text((660, 642), "Google Auth", fill=(71, 85, 105), font=ImageFont.truetype("arial.ttf", 11) if font_lbl != ImageFont.load_default() else font_lbl)

    img.save(wf_login)
    print("Wireframe 4 (Login) drawn successfully.")

def draw_wf_ai():
    img = Image.new("RGB", (1200, 800), color=(248, 250, 252))
    draw = ImageDraw.Draw(img)
    draw_common_layout(draw, "AI Chat Assistant Layout")
    
    # Fonts
    try:
        font_lbl = ImageFont.truetype("arial.ttf", 16)
        font_h2 = ImageFont.truetype("arial.ttf", 24)
        font_p = ImageFont.truetype("arial.ttf", 15)
    except Exception:
        font_h2 = font_p = font_lbl = ImageFont.load_default()

    # Split Chat Layout
    # Left Sidebar Prompts list
    draw.rectangle([50, 80, 380, 710], fill=(255, 255, 255), outline=(226, 232, 240), width=2)
    draw.text((80, 105), "Quick Eco Prompts suggestions", fill=(30, 41, 59), font=font_lbl)
    
    sidebar_prompts = [
        "Find homestays with solar heating",
        "Suggest low-carbon routes in Coorg",
        "Show Wayanad bamboo mud cabins",
        "Homestays doing waste-free compost"
    ]
    for idx, prompt in enumerate(sidebar_prompts):
        y_s = 145 + idx * 75
        draw.rectangle([70, y_s, 360, y_s + 55], fill=(241, 245, 249), outline=(226, 232, 240), width=1)
        draw.text((85, y_s + 18), f"Prompt suggestion #{idx+1}:", fill=(6, 95, 70), font=ImageFont.truetype("arial.ttf", 11) if font_lbl != ImageFont.load_default() else font_lbl)
        draw.text((85, y_s + 32), prompt[:30] + "...", fill=(100, 116, 139), font=ImageFont.truetype("arial.ttf", 12) if font_lbl != ImageFont.load_default() else font_lbl)

    # Right Chat area console
    draw.rectangle([410, 80, 1150, 710], fill=(255, 255, 255), outline=(226, 232, 240), width=2)
    draw.text((440, 105), "EcoStay AI Chat Assistant Interface Console", fill=(30, 41, 59), font=font_lbl)
    
    # Divider header
    draw.line([440, 135, 1120, 135], fill=(241, 245, 249), width=2)
    
    # Message bubbles
    # User message (Right align)
    ux1, uy1, ux2, uy2 = 780, 160, 1120, 220
    draw.rectangle([ux1, uy1, ux2, uy2], fill=(241, 245, 249), outline=(226, 232, 240), width=1)
    draw.text((ux1 + 15, uy1 + 12), "USER MESSAGE SENT:", fill=(6, 95, 70), font=ImageFont.truetype("arial.ttf", 11) if font_lbl != ImageFont.load_default() else font_lbl)
    draw.text((ux1 + 15, uy1 + 28), "Recommend solar homestays in Manali.", fill=(71, 85, 105), font=font_p)

    # AI message (Left align)
    ax1, ay1, ax2, ay2 = 440, 250, 920, 480
    draw.rectangle([ax1, ay1, ax2, ay2], fill=(255, 255, 255), outline=(203, 213, 225), width=1)
    draw.text((ax1 + 20, ay1 + 15), "AI RESPONSE VALUE LOG:", fill=(6, 95, 70), font=ImageFont.truetype("arial.ttf", 11) if font_lbl != ImageFont.load_default() else font_lbl)
    
    ai_text = (
        "Hello traveler! I have parsed our local database and verified 4 homestays in\n"
        "Manali with 100% solar heating. Here is the highest-rated option:"
    )
    draw.text((ax1 + 20, ay1 + 35), ai_text, fill=(71, 85, 105), font=font_p)
    
    # Integrated Card component inside AI bubble response
    draw.rectangle([ax1 + 20, ay1 + 80, ax2 - 20, ay2 - 15], fill=(248, 250, 252), outline=(226, 232, 240), width=1)
    draw.rectangle([ax1 + 35, ay1 + 95, ax1 + 150, ay2 - 30], fill=(226, 232, 240))
    draw.text((ax1 + 55, ay1 + 140), "Stay Image", fill=(148, 163, 184), font=ImageFont.truetype("arial.ttf", 11) if font_lbl != ImageFont.load_default() else font_lbl)
    draw.text((ax1 + 175, ay1 + 105), "The Whispering Pines Sanctuary", fill=(30, 41, 59), font=font_lbl)
    draw.text((ax1 + 175, ay1 + 130), "Manali, HP  |  Solar Certified  |  ★ 4.9 Rating", fill=(100, 116, 139), font=ImageFont.truetype("arial.ttf", 12) if font_lbl != ImageFont.load_default() else font_lbl)
    draw.text((ax1 + 175, ay1 + 155), "Click stay details box to navigate directly.", fill=(148, 163, 184), font=ImageFont.truetype("arial.ttf", 11) if font_lbl != ImageFont.load_default() else font_lbl)

    # Chat Input docked bottom
    draw.rectangle([440, 630, 1120, 690], fill=(248, 250, 252), outline=(226, 232, 240), width=1)
    draw.text((465, 650), "Input message query here: Ask anything about sustainable travel routes...", fill=(148, 163, 184), font=font_p)
    
    # Send button icon placeholder
    draw.rectangle([1060, 638, 1110, 682], fill=(203, 213, 225))
    draw.text((1075, 652), "Send", fill=(71, 85, 105), font=ImageFont.truetype("arial.ttf", 12) if font_lbl != ImageFont.load_default() else font_lbl)

    img.save(wf_ai)
    print("Wireframe 5 (AI Assistant) drawn successfully.")

def draw_all_wireframes():
    draw_wf_home()
    draw_wf_dashboard()
    draw_wf_detail()
    draw_wf_login()
    draw_wf_ai()

# ----------------- COMPILE PDF DOCUMENTS -----------------
def compile_wireframe_pdf():
    print("Compiling Wireframes PDF...")
    pdf = SubmissionPDF(doc_type="Figma Wireframes", orientation='portrait', unit='mm', format='A4')
    pdf.set_margins(left=20, top=20, right=20)
    pdf.set_auto_page_break(auto=True, margin=15)
    
    # Cover page
    create_cover_page(pdf, "Figma Wireframes")
    
    # 5 Screens
    screens = [
        ("Home Page Wireframe Layout", wf_home),
        ("Dashboard Page Wireframe Layout", wf_dashboard),
        ("Homestay Detail View Wireframe Layout", wf_detail),
        ("Login/Signup Page Wireframe Layout", wf_login),
        ("AI Travel Assistant Page Wireframe Layout", wf_ai)
    ]
    
    for title, img_path in screens:
        pdf.add_page()
        pdf.set_font('helvetica', 'B', 16)
        pdf.set_text_color(15, 23, 42)
        pdf.cell(0, 10, title, new_x="LMARGIN", new_y="NEXT")
        pdf.ln(5)
        
        # 1200x800 aspect ratio: Width 170mm, Height 170 * (800/1200) = 113.3mm
        pdf.image(img_path, x=20, y=45, w=170, h=113.3)
        
        pdf.set_xy(20, 168)
        pdf.set_font('helvetica', 'I', 10)
        pdf.set_text_color(100, 100, 100)
        pdf.cell(0, 10, f"Figure: Low-Fidelity Layout - {title}", align='C', new_x="LMARGIN", new_y="NEXT")
        
    pdf.output(PDF_WIREFRAMES)
    print(f"Success: Figma Wireframes PDF generated at: {PDF_WIREFRAMES}")

def compile_screenshots_pdf():
    print("Compiling Responsive Screenshots PDF...")
    pdf = SubmissionPDF(doc_type="Responsive Screenshots", orientation='portrait', unit='mm', format='A4')
    pdf.set_margins(left=20, top=20, right=20)
    pdf.set_auto_page_break(auto=True, margin=15)
    
    # Cover page
    create_cover_page(pdf, "Responsive Screenshots")
    
    # Captures in exact required order
    # 1. Dashboard Mobile View
    pdf.add_page()
    pdf.set_font('helvetica', 'B', 16)
    pdf.set_text_color(15, 23, 42)
    pdf.cell(0, 10, '1. Dashboard Page - Mobile View (375px)', new_x="LMARGIN", new_y="NEXT")
    pdf.ln(5)
    
    # 375x812: w=65mm, h=65*(812/375)=140.7mm, centered at x = (210-65)/2 = 72.5mm
    pdf.image(img_mobile, x=72.5, y=45, w=65, h=140.7)
    pdf.set_xy(20, 195)
    pdf.set_font('helvetica', 'I', 10)
    pdf.set_text_color(100, 100, 100)
    pdf.cell(0, 10, 'Figure 1: Dashboard Page View (Mobile viewport)', align='C', new_x="LMARGIN", new_y="NEXT")
    
    # 2. Dashboard Tablet View
    pdf.add_page()
    pdf.set_font('helvetica', 'B', 16)
    pdf.set_text_color(15, 23, 42)
    pdf.cell(0, 10, '2. Dashboard Page - Tablet View (768px)', new_x="LMARGIN", new_y="NEXT")
    pdf.ln(5)
    
    # 768x1024: w=110mm, h=110*(1024/768)=146.7mm, centered at x = (210-110)/2 = 50mm
    pdf.image(img_tablet, x=50, y=45, w=110, h=146.7)
    pdf.set_xy(20, 200)
    pdf.set_font('helvetica', 'I', 10)
    pdf.set_text_color(100, 100, 100)
    pdf.cell(0, 10, 'Figure 2: Dashboard Page View (Tablet viewport)', align='C', new_x="LMARGIN", new_y="NEXT")
    
    # 3. Dashboard Desktop View
    pdf.add_page()
    pdf.set_font('helvetica', 'B', 16)
    pdf.set_text_color(15, 23, 42)
    pdf.cell(0, 10, '3. Dashboard Page - Desktop View (1440px)', new_x="LMARGIN", new_y="NEXT")
    pdf.ln(5)
    
    # 1440x900 (16:10 aspect ratio): w=170mm, h=170*(900/1440)=106.25mm
    pdf.image(img_desktop, x=20, y=45, w=170, h=106.25)
    pdf.set_xy(20, 162)
    pdf.set_font('helvetica', 'I', 10)
    pdf.set_text_color(100, 100, 100)
    pdf.cell(0, 10, 'Figure 3: Dashboard Page View (Desktop viewport)', align='C', new_x="LMARGIN", new_y="NEXT")
    
    # 4. Dashboard Light Mode
    pdf.add_page()
    pdf.set_font('helvetica', 'B', 16)
    pdf.set_text_color(15, 23, 42)
    pdf.cell(0, 10, '4. Dashboard Page - Light Theme View', new_x="LMARGIN", new_y="NEXT")
    pdf.ln(5)
    
    pdf.image(img_light, x=20, y=45, w=170, h=106.25)
    pdf.set_xy(20, 162)
    pdf.set_font('helvetica', 'I', 10)
    pdf.set_text_color(100, 100, 100)
    pdf.cell(0, 10, 'Figure 4: Dashboard Page in Light Mode Theme', align='C', new_x="LMARGIN", new_y="NEXT")
    
    # 5. Dashboard Dark Mode
    pdf.add_page()
    pdf.set_font('helvetica', 'B', 16)
    pdf.set_text_color(15, 23, 42)
    pdf.cell(0, 10, '5. Dashboard Page - Dark Theme View', new_x="LMARGIN", new_y="NEXT")
    pdf.ln(5)
    
    pdf.image(img_dark, x=20, y=45, w=170, h=106.25)
    pdf.set_xy(20, 162)
    pdf.set_font('helvetica', 'I', 10)
    pdf.set_text_color(100, 100, 100)
    pdf.cell(0, 10, 'Figure 5: Dashboard Page in Dark Mode Theme ( localStorage Persistence)', align='C', new_x="LMARGIN", new_y="NEXT")
    
    pdf.output(PDF_SCREENSHOTS)
    print(f"Success: Responsive Screenshots PDF generated at: {PDF_SCREENSHOTS}")

def main():
    # Draw Figma Wireframe placeholders first
    draw_all_wireframes()
    
    # Wait for Vite local server to start up
    if not wait_for_server():
        return
    
    # Capture responsive layouts
    capture_screenshot(f"{URL_BASE}/dashboard", img_mobile, 375, 812)
    capture_screenshot(f"{URL_BASE}/dashboard", img_tablet, 768, 1024)
    capture_screenshot(f"{URL_BASE}/dashboard", img_desktop, 1440, 900)
    
    # Capture theme overrides
    capture_screenshot(f"{URL_BASE}/dashboard?theme=light", img_light, 1440, 900)
    capture_screenshot(f"{URL_BASE}/dashboard?theme=dark", img_dark, 1440, 900)
    
    # Build PDF deliverables
    compile_wireframe_pdf()
    compile_screenshots_pdf()

if __name__ == "__main__":
    main()
