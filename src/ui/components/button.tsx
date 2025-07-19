import type { Component, ComponentProps } from "solid-js";
import { splitProps } from "solid-js";
import { Button as ButtonPrimitive } from "@kobalte/core/button";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "../lib/utils";

const buttonVariants = tv({
  base: "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  variants: {
    variant: {
      default:
        "bg-primary text-primary-foreground neumorphic-button",
      destructive:
        "bg-destructive text-destructive-foreground neumorphic-button",
      outline:
        "border-none bg-background text-foreground neumorphic-button",
      secondary:
        "bg-secondary text-secondary-foreground neumorphic-button",
      ghost: "hover:bg-accent hover:text-accent-foreground",
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
    <>
      <style>
        {`
          .neumorphic-button {
            box-shadow: 5px 5px 10px var(--shadow-dark), -5px -5px 10px var(--shadow-light);
          }
          .neumorphic-button:hover {
            box-shadow: 7px 7px 14px var(--shadow-dark), -7px -7px 14px var(--shadow-light);
          }
          .neumorphic-button:active {
            box-shadow: inset 5px 5px 10px var(--shadow-dark), inset -5px -5px 10px var(--shadow-light);
          }
        `}
      </style>
      <ButtonPrimitive
        class={cn(
          buttonVariants({ variant: local.variant, size: local.size }),
          local.class
        )}
        {...rest}
      />
    </>
  );
};

export { Button, buttonVariants };
