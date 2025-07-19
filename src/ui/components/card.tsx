import { splitProps, type Component, type ComponentProps } from "solid-js";
import { cn } from "../../lib/utils";

const Card: Component<ComponentProps<"div">> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      class={cn("rounded-lg text-card-foreground neumorphic", local.class)}
      {...rest}
    />
  );
};

const CardHeader: Component<ComponentProps<"div">> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return <div class={cn("flex flex-col space-y-1.5 p-6", local.class)} {...rest} />;
};

const CardTitle: Component<ComponentProps<"h3">> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <h3
      class={cn("text-2xl font-semibold leading-none tracking-tight", local.class)}
      {...rest}
    />
  );
};

const CardDescription: Component<ComponentProps<"p">> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return <p class={cn("text-sm text-muted-foreground", local.class)} {...rest} />;
};

const CardContent: Component<ComponentProps<"div">> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return <div class={cn("p-6 pt-0", local.class)} {...rest} />;
};

const CardFooter: Component<ComponentProps<"div">> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return <div class={cn("flex items-center p-6 pt-0", local.class)} {...rest} />;
};

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
