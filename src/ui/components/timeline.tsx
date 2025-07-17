import type { Component, ComponentProps } from "solid-js";
import { splitProps } from "solid-js";
import { cn } from "../lib/utils";

const Timeline: Component<ComponentProps<"div">> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      class={cn("relative pl-8 border-l-2 border-border", local.class)}
      {...rest}
    />
  );
};

const TimelineItem: Component<ComponentProps<"div">> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div class={cn("mb-8", local.class)} {...rest}>
      <div class="absolute w-4 h-4 bg-primary rounded-full -left-2 mt-1.5"></div>
      {props.children}
    </div>
  );
};

const TimelineTitle: Component<ComponentProps<"h3">> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return <h3 class={cn("text-2xl font-semibold text-primary", local.class)} {...rest} />;
};

const TimelineSubtitle: Component<ComponentProps<"p">> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return <p class={cn("text-md text-foreground/80 mb-2", local.class)} {...rest} />;
};

const TimelineContent: Component<ComponentProps<"p">> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return <p class={cn("text-foreground/80 leading-relaxed", local.class)} {...rest} />;
};

export { Timeline, TimelineItem, TimelineTitle, TimelineSubtitle, TimelineContent };
