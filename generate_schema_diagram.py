import os
from PIL import Image, ImageDraw, ImageFont

def draw_schema():
    print("Generating visual database schema diagram...")
    
    # Dimensions and Background
    width, height = 1800, 1100
    img = Image.new('RGB', (width, height), color=(248, 250, 252)) # Slate 50
    draw = ImageDraw.Draw(img)
    
    # Fonts
    font_path = r"C:\Windows\Fonts\arial.ttf"
    try:
        font_title = ImageFont.truetype(font_path, 28)
        font_table_header = ImageFont.truetype(font_path, 20)
        font_body_bold = ImageFont.truetype(font_path, 15)
        font_body = ImageFont.truetype(font_path, 14)
        font_caption = ImageFont.truetype(font_path, 13)
    except Exception:
        font_title = ImageFont.load_default()
        font_table_header = ImageFont.load_default()
        font_body_bold = ImageFont.load_default()
        font_body = ImageFont.load_default()
        font_caption = ImageFont.load_default()

    # Draw Page Title and Metadata
    draw.rectangle([0, 0, width, 100], fill=(6, 95, 70)) # Emerald 800
    draw.text((50, 20), "EcoStay Connect - Database Schema Diagram", fill=(255, 255, 255), font=font_title)
    draw.text((50, 60), "Intern ID: 26101252   |   Week 5 Database Design & Relationships", fill=(209, 250, 229), font=font_caption)

    # Color Palette Definitions
    header_fill = (15, 118, 110) # Teal 700
    table_border = (203, 213, 225) # Slate 300
    text_primary = (15, 23, 42) # Slate 900
    text_secondary = (100, 116, 139) # Slate 500
    accent_relation = (14, 165, 233) # Sky 500

    # Helper function to draw a table box
    def draw_table(name, x, y, w, fields):
        # Header Box
        header_height = 45
        draw.rectangle([x, y, x + w, y + header_height], fill=header_fill)
        draw.text((x + 15, y + 12), name, fill=(255, 255, 255), font=font_table_header)
        
        # Row Heights
        row_height = 32
        total_height = header_height + (len(fields) * row_height)
        
        # Table Body Box
        draw.rectangle([x, y + header_height, x + w, y + total_height], fill=(255, 255, 255), outline=table_border, width=2)
        draw.rectangle([x, y, x + w, y + total_height], outline=table_border, width=2)

        # Draw Fields
        for idx, (field_name, field_type, key_type) in enumerate(fields):
            row_y = y + header_height + (idx * row_height)
            
            # Row shading lines
            if idx % 2 == 1:
                draw.rectangle([x + 2, row_y, x + w - 2, row_y + row_height], fill=(241, 245, 249)) # Slate 100
                
            # Key type indicator
            key_text = ""
            if key_type == "PK":
                key_text = "🔑 PK"
                draw.text((x + 15, row_y + 8), field_name, fill=text_primary, font=font_body_bold)
            elif key_type == "FK":
                key_text = "🔗 FK"
                draw.text((x + 15, row_y + 8), field_name, fill=text_primary, font=font_body_bold)
            elif key_type == "UK":
                key_text = "⭐ UK"
                draw.text((x + 15, row_y + 8), field_name, fill=text_primary, font=font_body_bold)
            else:
                draw.text((x + 15, row_y + 8), field_name, fill=text_primary, font=font_body)
                
            # Type and Key labels
            draw.text((x + 180, row_y + 8), field_type, fill=text_secondary, font=font_body)
            if key_text:
                draw.text((x + w - 70, row_y + 8), key_text, fill=header_fill, font=font_caption)
                
            # Divider lines
            if idx < len(fields) - 1:
                draw.line([(x, row_y + row_height), (x + w, row_y + row_height)], fill=(226, 232, 240), width=1)
                
        return x, y, w, total_height

    # Define Schema Tables Data
    user_fields = [
        ("_id", "ObjectId", "PK"),
        ("name", "String", ""),
        ("email", "String", "UK"),
        ("password", "String", ""),
        ("role", "String", ""),
        ("createdAt", "Date", ""),
        ("updatedAt", "Date", ""),
    ]

    homestay_fields = [
        ("_id", "ObjectId", "PK"),
        ("title", "String", ""),
        ("location", "String", ""),
        ("description", "String", ""),
        ("price", "Number", ""),
        ("rating", "Number", ""),
        ("reviewsCount", "Number", ""),
        ("image", "String", ""),
        ("ecoFeatures", "Array[String]", ""),
        ("ownerName", "String", ""),
        ("availability", "Boolean", ""),
        ("createdAt", "Date", ""),
        ("updatedAt", "Date", ""),
    ]

    booking_fields = [
        ("_id", "ObjectId", "PK"),
        ("customerName", "String", ""),
        ("email", "String", ""),
        ("homestayId", "ObjectId", "FK"),
        ("checkIn", "Date", ""),
        ("checkOut", "Date", ""),
        ("guests", "Number", ""),
        ("bookingStatus", "String", ""),
        ("createdAt", "Date", ""),
        ("updatedAt", "Date", ""),
    ]

    # Draw the Tables
    ux, uy, uw, uh = draw_table("User (Collection: users)", 100, 200, 380, user_fields)
    hx, hy, hw, hh = draw_table("Homestay (Collection: homestays)", 650, 200, 420, homestay_fields)
    bx, by, bw, bh = draw_table("Booking (Collection: bookings)", 1250, 200, 420, booking_fields)

    # Draw Relation Connectors (Booking.homestayId -> Homestay._id)
    # Start: Right edge of Homestay._id row (Index 0, Y = hy + 45 + 16 = hy + 61)
    # End: Left edge of Booking.homestayId row (Index 3, Y = by + 45 + 3 * 32 + 16 = by + 157)
    start_pt = (hx + hw, hy + 61)
    end_pt = (bx, by + 157)
    
    # Drawing Orthogonal Relationship line
    mid_x = (start_pt[0] + end_pt[0]) // 2
    draw.line([start_pt, (mid_x, start_pt[1]), (mid_x, end_pt[1]), end_pt], fill=accent_relation, width=4)
    
    # Draw Cardinality Markers
    # Crow's foot at many side (Booking table): three lines diverging
    draw.line([(bx, by + 157), (bx - 15, by + 157 - 10)], fill=accent_relation, width=4)
    draw.line([(bx, by + 157), (bx - 15, by + 157 + 10)], fill=accent_relation, width=4)
    draw.line([(bx - 15, by + 157 - 12), (bx - 15, by + 157 + 12)], fill=accent_relation, width=4)
    
    # One side markers at Homestay table: two bars
    draw.line([(hx + hw + 8, hy + 61 - 10), (hx + hw + 8, hy + 61 + 10)], fill=accent_relation, width=4)
    draw.line([(hx + hw + 16, hy + 61 - 10), (hx + hw + 16, hy + 61 + 10)], fill=accent_relation, width=4)

    # Draw Relationship label text in the middle
    draw.rectangle([mid_x - 70, (start_pt[1] + end_pt[1]) // 2 - 12, mid_x + 70, (start_pt[1] + end_pt[1]) // 2 + 12], fill=(255, 255, 255), outline=accent_relation, width=1)
    draw.text((mid_x - 55, (start_pt[1] + end_pt[1]) // 2 - 7), "has many bookings", fill=text_primary, font=font_caption)

    # Save Output
    output_path = "W5_SchemaDiagram_26101252.png"
    img.save(output_path)
    print(f"Saved database schema diagram image successfully to {output_path}")

if __name__ == "__main__":
    draw_schema()
