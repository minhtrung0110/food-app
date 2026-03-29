# Kết nối Figma MCP với Claude Code cho project này

Tài liệu này dành cho project `food-app` hiện tại:

- Stack: Expo 54, React Native 0.81, Expo Router v6
- UI: NativeWind v5 + Tailwind v4
- Token màu đang nằm ở cả [`constants/Colors.ts`](../constants/Colors.ts) và [`app/globals.css`](../app/globals.css)
- Component có sẵn ở `components/atoms`, `components/molecules`, `components/orangism`

Mục tiêu là để anh dùng **Claude Code + Figma MCP** để:

1. Lấy design context từ Figma vào IDE
2. Nhờ Claude implement UI đúng theo frame/component
3. Khi cần thì capture UI web của app vào Figma để review

## 1. Chọn cách kết nối

Hiện tại Figma có 2 kiểu MCP chính:

- **Remote server**: nên dùng trước. Không phụ thuộc Figma desktop app đang mở file nào, phù hợp cho flow thường ngày với Claude Code.
- **Desktop server**: dùng khi anh muốn Claude đọc trực tiếp file/frame đang mở trong Figma desktop app và Dev Mode.

Với project này, tôi khuyên:

- Dùng **remote server** làm mặc định
- Chỉ dùng thêm **desktop server** khi anh hay làm việc trực tiếp trong Figma desktop app và muốn lấy context từ selection hiện tại

## 2. Điều kiện trước khi làm

Anh cần:

- `claude` CLI chạy được
- Tài khoản Figma đăng nhập được
- Nếu muốn dùng MCP ổn định nhiều hơn mức cơ bản, nên có **Dev seat** hoặc **Full seat**

Theo Figma docs tại thời điểm 2026-03-29:

- Starter / View / Collab: tối đa **6 tool calls / tháng**
- Pro hoặc Organization với Dev/Full seat: tối đa **200 tool calls / ngày**
- Enterprise: tối đa **600 tool calls / ngày**

## 3. Cấu hình remote Figma MCP cho Claude Code

Chạy lệnh này trong terminal:

```powershell
claude mcp add --transport http figma https://mcp.figma.com/mcp
```

Sau đó kiểm tra:

```powershell
claude mcp list
claude mcp get figma
```

Rồi mở Claude Code trong project này và làm bước auth:

```text
/mcp
```

Nếu Claude Code hiện prompt đăng nhập hoặc cấp quyền cho Figma thì làm hết flow đó.

Khi xong, anh có thể test nhanh bằng prompt kiểu:

```text
Use the Figma MCP server and inspect this frame: <FIGMA_URL>.
This repo is Expo Router + React Native + NativeWind, not web React.
Summarize the structure first, then implement the UI in the correct screen file.
```

## 4. Khi nào nên dùng desktop server

Desktop server hợp khi:

- Anh đang mở file trong **Figma desktop app**
- Anh muốn Claude bám vào frame/selection hiện tại trong Dev Mode
- Tools remote không đủ tiện cho flow anh đang làm

Flow tổng quát:

1. Mở Figma desktop app
2. Mở đúng file thiết kế
3. Chuyển sang **Dev Mode**
4. Bật phần **MCP server**
5. Kết nối server đó vào Claude Code

Lưu ý quan trọng:

- Figma docs nói desktop server chỉ chạy khi app Figma đang mở và file đang active
- Nếu tool không load, cần kiểm tra Dev Mode đã bật MCP chưa, file có đang mở không, rồi restart Figma app và IDE

Vì endpoint local của desktop server có thể thay đổi theo version/tài liệu mới của Figma, nên nếu anh dùng nhánh này thì đọc lại doc setup chính thức trước khi add vào Claude Code.

## 5. Cách prompt đúng cho riêng repo này

Đây là phần quan trọng nhất. Figma MCP chỉ đưa context; **Claude mới là thằng viết code**. Nếu prompt không chặt, nó rất dễ sinh sai stack hoặc bỏ qua design system hiện có.

Khi prompt, luôn nói rõ các ràng buộc sau:

- Đây là **React Native / Expo**, không phải React DOM
- Routing dùng **Expo Router** trong thư mục `app/`
- Styling dùng **NativeWind**
- Ưu tiên tái sử dụng component có sẵn ở `components/`
- Nếu thêm màu mới thì phải sync cả `constants/Colors.ts` và `app/globals.css`

### Prompt mẫu: implement một screen từ Figma

```text
Use the Figma MCP server to inspect this frame: <FIGMA_URL>.

Implement it for this repo as React Native Expo code, not web React.
Use Expo Router conventions under app/.
Use NativeWind utility classes and reuse existing components from:
- components/atoms
- components/molecules
- components/orangism

Before editing, inspect:
- app/
- components/
- constants/Colors.ts
- app/globals.css

If the design introduces new colors, keep constants/Colors.ts and app/globals.css in sync.
Target screen: app/(auth)/(flow)/(sso)/sign-in.tsx
```

### Prompt mẫu: update screen đã có

```text
Use the Figma MCP server to inspect this frame: <FIGMA_URL>.
Update app/(tabs)/index.tsx to match the design.
Stay within the existing visual language of this repo.
Prefer existing components before creating new ones.
Explain any mismatch between the Figma design and current mobile constraints before editing.
```

### Prompt mẫu: tách component từ design

```text
Use the Figma MCP server to inspect this component/frame: <FIGMA_URL>.
Create a reusable React Native component for this repo.
Place it in the most appropriate location under components/ or features/.
Use NativeWind and existing color tokens.
Do not generate web-only code or CSS modules.
```

## 6. Nên bảo Claude đọc gì trước khi code

Trong repo này, nên bắt Claude đọc các path sau trước:

- `CLAUDE.md`
- `app/`
- `components/`
- `constants/Colors.ts`
- `app/globals.css`
- `utils/style.ts`

Nếu làm auth screen thì thêm:

- `app/(auth)/`
- `libs/schema/`
- `components/molecules/form/`

Nếu làm tab screen thì thêm:

- `app/(tabs)/`
- `features/tabs/home/components/`
- `components/molecules/navigation/AppTabBar.tsx`

## 7. Code to Canvas với project này

Figma có flow **Code to Canvas** qua remote server để capture UI từ browser sang Figma.

Với project này, anh nên hiểu đúng:

- Project là **mobile-first React Native**
- Nhưng repo có `react-native-web`, nên anh có thể chạy bản web để capture layout review
- Flow này tốt để review nhanh structure, spacing, empty states, copy, luồng màn hình
- Nó **không thay thế** việc implement native UI trong `app/` và `components/`

Chạy app web:

```powershell
yarn web
```

Sau đó có thể dùng prompt kiểu:

```text
Use Figma MCP code-to-canvas to capture the current web UI of this Expo app into a new Figma file.
Focus on the sign-in and home flows.
After capture, help me compare the captured layout with the target Figma design.
```

## 8. Mẹo để kết quả đỡ lệch

- Chọn frame vừa đủ nhỏ. Đừng đưa cả file lớn ngay từ đầu.
- Bảo Claude **summarize structure first**, rồi mới code.
- Chỉ rõ file đích. Ví dụ: `app/(auth)/(flow)/(sso)/sign-in.tsx`
- Nếu design có component lặp lại, bảo Claude tách component reusable
- Nếu Figma dùng token/variable rõ ràng, kết quả thường ổn hơn
- Nếu Claude sinh code web, nhắc lại: `React Native Expo, not web React`

## 9. Troubleshooting ngắn

### Claude không thấy tool Figma

Kiểm tra:

- `claude mcp list`
- vào `/mcp` để xem trạng thái auth
- remote server đã add đúng chưa

### Desktop tools không load

Theo Figma docs, cần kiểm tra:

- Figma desktop app đang chạy
- đúng file đang mở
- Dev Mode đã bật
- MCP trong Figma đã enable

Nếu vẫn lỗi:

- restart Figma app
- restart Claude Code / IDE

### Claude sinh sai stack

Thêm ngay trong prompt:

```text
This codebase is Expo + React Native + NativeWind.
Do not generate React DOM, CSS modules, or browser-only APIs unless I explicitly ask for web.
```

## 10. Quy trình khuyên dùng cho project này

1. Add `figma` remote MCP vào Claude Code
2. Auth bằng `/mcp`
3. Cho Claude đọc `CLAUDE.md` + screen/file liên quan
4. Đưa **1 frame hoặc 1 component** Figma cụ thể
5. Yêu cầu Claude summarize trước, code sau
6. Review diff
7. Nếu cần review bố cục tổng thể, chạy `yarn web` rồi dùng code-to-canvas

## 11. Nếu muốn chuẩn hơn nữa

Bước tiếp theo đáng làm là tạo một file rule/prompt ngắn để lần nào Claude cũng nhớ:

- Expo Router
- React Native only
- NativeWind
- tái sử dụng component có sẵn
- sync dual color system

Nếu anh muốn, bước sau tôi có thể tạo luôn cho anh:

- file prompt/rule dùng lại cho Claude Code
- file `.mcp.json` ở root project
- checklist prompt cho từng loại màn hình: auth, tabs, bottom sheet

## Nguồn chính thức

- Anthropic Claude Code MCP: https://docs.anthropic.com/en/docs/claude-code/mcp
- Figma MCP overview và setup: https://developers.figma.com/docs/figma-mcp-server/
- Figma plans / access / permissions: https://developers.figma.com/docs/figma-mcp-server/plans-access-and-permissions/
- Figma code to canvas: https://developers.figma.com/docs/figma-mcp-server/code-to-canvas/
- Figma MCP vs agent responsibilities: https://developers.figma.com/docs/figma-mcp-server/mcp-vs-agent/
- Figma troubleshooting tools not loading: https://developers.figma.com/docs/figma-mcp-server/tools-not-loading/
