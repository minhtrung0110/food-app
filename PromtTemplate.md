# 🎨 Figma → Code Prompt Template

---

## Quick (1-liner)

```
Convert this Figma frame to React + Tailwind, pixel-perfect, responsive: [LINK]
```

---

## Standard

```
Convert this Figma design to code: [LINK]

- Framework: [React / HTML / Vue]
- Styling: [Tailwind / CSS Module / plain CSS]
- Pixel-perfect, responsive (375 / 768 / 1440px)
- Split into components where repeated
- Use exact colors, font sizes, spacing from Figma
- Icons: [Lucide / Heroicons] — images: https://placehold.co
```

---

## Detailed

```
You are a frontend developer converting Figma designs to clean code.

Figma link: [LINK]
Framework: [React / Vue / HTML]
Styling: [Tailwind / SCSS / CSS Module]
Breakpoints: mobile 375px · tablet 768px · desktop 1440px

Tasks:
1. Analyze layout, colors, typography from the Figma link
2. Write complete, ready-to-run code
3. Name classes/components clearly (BEM or common convention)
4. Use Lucide icons, placehold.co for images
5. Note any fonts or assets that need to be installed

Output: full code file(s) + setup notes if needed
```

## Template cơ bản (dùng hàng ngày)

```
Hãy cắt UI từ link Figma sau thành code [React / HTML+Tailwind / HTML+CSS]:

🔗 Link Figma: [PASTE LINK VÀO ĐÂY]

Yêu cầu:
- Dùng [React + Tailwind CSS / HTML thuần / Vue]
- Pixel-perfect theo design
- Responsive: mobile + desktop
- Tách component hợp lý nếu có phần lặp lại
- Dùng đúng màu sắc, font size, spacing từ Figma
- Không dùng inline style, ưu tiên class
```

---

## Template chi tiết (khi cần output chuẩn hơn)

```
Bạn là một frontend developer chuyên cắt UI từ Figma.

🔗 Link Figma: [PASTE LINK VÀO ĐÂY]
📦 Framework: [React / HTML / Vue]
🎨 Styling: [Tailwind CSS / CSS Module / SCSS / CSS thuần]
📐 Breakpoint: [Mobile 375px / Tablet 768px / Desktop 1440px]

Nhiệm vụ:
1. Phân tích layout, màu sắc, typography từ link Figma
2. Viết code hoàn chỉnh, có thể chạy ngay
3. Đặt tên class/component rõ ràng theo BEM hoặc convention thông dụng
4. Nếu có icon, dùng [Lucide / Heroicons / Font Awesome]
5. Nếu có ảnh placeholder, dùng https://placehold.co

Output trả về:
- File(s) code đầy đủ
- Ghi chú nếu có font hoặc asset cần cài thêm
```

---

## Template nhanh (1 dòng)

```
Cắt UI Figma này thành React + Tailwind, pixel-perfect, responsive: [LINK]
```

---

## 💡 Gợi ý dùng Text Expander

| Shortcut gõ | Expand thành                   |
| ----------- | ------------------------------ |
| `;fig`      | Template cơ bản (chỉ đổi link) |
| `;figfull`  | Template chi tiết              |
| `;figq`     | Template 1 dòng                |

**Tool gợi dùng:** Raycast (Mac) · Espanso (Win/Linux/Mac) · AutoHotkey (Win)
