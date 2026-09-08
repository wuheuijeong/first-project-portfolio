import { skillIconMap } from "../../../lib/skillIcons";
import styles from "./SkillBox.module.css";

interface SkillBoxProps {
  title: string;
  description: string;
}

export default function SkillBox({ title, description }: SkillBoxProps) {
  const entry = skillIconMap[title];
  const IconComponent = entry?.icon;
  const iconColor = entry?.color ?? "#999999";

  return (
    <div className={styles.skillbox}>
      <div className={styles.boxheader}>
        {IconComponent ? <IconComponent size={20} color={iconColor} /> : <span>🔧</span>}
        <span>{title}</span>
      </div>
      <p className={styles.boxdescription}>{description}</p>
    </div>
  );
}