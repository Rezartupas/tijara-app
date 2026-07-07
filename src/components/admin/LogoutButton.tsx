"use client";

export default function LogoutButton() {
  return (
    <button
      type="button"
      onClick={async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        window.location.href = "/admin/login";
      }}
      className="text-xs text-red-500 hover:underline"
    >
      Keluar
    </button>
  );
}
