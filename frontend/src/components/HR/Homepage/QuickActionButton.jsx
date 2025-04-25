import { Button } from "@/components/ui/button";

export function QuickActionButton({ logo: Logo, text }) {
  return (
    <Button
      className={
        "bg-transparent border border-black text-black hover:bg-neutral-200 cursor-pointer"
      }
    >
      <Logo className="" /> {text}
    </Button>
  );
}
