import type { Component, ComponentProps } from "solid-js";
import { splitProps } from "solid-js";
import { Button as ButtonPrimitive } from "@kobalte/core/button";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "../lib/utils";

const buttonVariants = tv({
  base: "inline-flex items-center justify-center rounded-md text-sm font-medium cursor-pointer",
  variants: {
    variant: {
      default:
        "bg-primary/90 text-secondary-foreground hover:bg-primary/60",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/60",
      outline:
        "border-none bg-background text-foreground",
      secondary:
        "bg-secondary/50 text-secondary-foreground hover:bg-secondary/30",
      ghost: "hover:bg-secondary text-secondary-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    },
    size: {
      default: "h-10 py-2 px-4",
      sm: "h-9 px-3 rounded-md",
      lg: "h-11 px-8 rounded-md",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps
  extends ComponentProps<typeof ButtonPrimitive>,
    VariantProps<typeof buttonVariants> {}

/**
 * Button component with theme variants and dark mode support
 */
const Button: Component<ButtonProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "variant", "size"]);


  return (
    <ButtonPrimitive
      class={cn(
        buttonVariants({ variant: local.variant, size: local.size }),
        local.class
      )}
      {...rest}
    />
  );
};

export { Button, buttonVariants };
