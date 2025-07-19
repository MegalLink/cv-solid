import { type Component, createSignal } from "solid-js";
import type { JSX } from "solid-js";
import { cn } from "../../lib/utils";

const styles = `
  .flip-card {
    background-color: transparent;
    width: 100%;
    height: 180px;
    perspective: 1000px;
    cursor: pointer;
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
  }

  .flip-card-inner.is-flipped {
    transform: rotateY(180deg);
  }

  .flip-card-front,
  .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border-radius: 0.5rem; /* Corresponds to rounded-lg */
  }

  .flip-card-back {
    transform: rotateY(180deg);
  }
`;

interface SkillCardProps {
  icon: JSX.Element;
  title: string;
  skills: string[];
  textColorClass?: string;
  bgColorClass?: string;
}

const SkillCard: Component<SkillCardProps> = (props) => {
  const [isFlipped, setIsFlipped] = createSignal(false);

  return (
    <>
      <style>{styles}</style>

    <div 
      class="flip-card" 
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div class="flip-card-inner" classList={{ 'is-flipped': isFlipped() }}>
        <div class={cn("flip-card-front p-6 rounded-lg text-center flex flex-col items-center justify-center gap-4", props.bgColorClass || 'bg-transparent')}>
          {props.icon}
          <h3 class={cn("text-xl font-semibold", props.textColorClass || 'text-primary-foreground')}>{props.title}</h3>
        </div>
        <div class={cn("flip-card-back p-6 rounded-lg text-center flex flex-col items-center justify-center gap-4", props.bgColorClass || 'bg-transparent')}>
          <h3 class={cn("text-xl font-semibold mb-2", props.textColorClass || 'text-primary-foreground')}>{props.title}</h3>
          <ul class="list-none p-0 m-0">
            {props.skills.map((skill) => (
              <li class={cn(props.textColorClass || 'text-primary-foreground', "font-medium")}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </>
  );
};

export default SkillCard;