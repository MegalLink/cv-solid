import { type Component, createSignal } from "solid-js";
import type { JSX } from "solid-js";

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
        <div class="flip-card-front bg-secondary p-6 rounded-lg text-center flex flex-col items-center justify-center gap-4">
          {props.icon}
          <h3 class="text-xl font-semibold text-secondary-foreground">{props.title}</h3>
        </div>
        <div class="flip-card-back bg-secondary p-6 rounded-lg text-center flex flex-col items-center justify-center gap-4">
          <h3 class="text-xl font-semibold text-secondary-foreground mb-2">{props.title}</h3>
          <ul class="list-none p-0 m-0">
            {props.skills.map((skill) => (
              <li class="text-secondary-foreground/80">{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </>
  );
};

export default SkillCard;