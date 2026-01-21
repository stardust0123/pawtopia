import {
  BackButton,
  ForwardButton,
  HomeButton,
  AddButton,
  CartButton,
  SearchButton,
  SaveButton,
  MoreButton,
  MenuButton,
  MinusButton,
  ShareButton,
  ProfileButton,
  StarButton,
  WriteButton,
} from "@/ui/icons";

const buttons = [
  { id: "back", label: "BackButton", element: <BackButton /> },
  { id: "forward", label: "ForwardButton", element: <ForwardButton /> },
  { id: "home", label: "HomeButton", element: <HomeButton /> },
  { id: "add", label: "AddButton", element: <AddButton /> },
  { id: "minus", label: "MinusButton", element: <MinusButton /> },
  { id: "cart", label: "CartButton", element: <CartButton /> },
  { id: "search", label: "SearchButton", element: <SearchButton /> },
  { id: "save", label: "SaveButton", element: <SaveButton /> },
  { id: "share", label: "ShareButton", element: <ShareButton /> },
  { id: "menu", label: "MenuButton", element: <MenuButton /> },
  { id: "more", label: "MoreButton", element: <MoreButton /> },
  { id: "profile", label: "ProfileButton", element: <ProfileButton /> },
  { id: "star", label: "StarButton", element: <StarButton /> },
  { id: "write", label: "WriteButton", element: <WriteButton /> },
];

export default function TestPage() {
  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontSize: 24, marginBottom: 20 }}>
        Button Showcase
      </h1>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {buttons.map((item) => (
          <div
            key={item.id}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            {item.element}
            <span style={{ fontSize: 14 }}>
              icon: {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
