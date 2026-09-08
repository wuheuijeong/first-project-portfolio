import { skillIconMap } from "../../../lib/skillIcons";
import styles from "./SkillBox.module.css";

interface SkillBoxProps {
  title: string;
  description: string;
}

export default function SkillBox({ title, description }: SkillBoxProps) {
  // 매핑에 없는 기술이면 기본 아이콘으로 대체
  const IconComponent = skillIconMap[title];

  return (
    <div className={styles.skillbox}>
      <div className={styles.boxheader}>
        {IconComponent ? <IconComponent size={20} /> : <span>🔧</span>}
        <span>{title}</span>
      </div>
      <p className={styles.boxdescription}>{description}</p>
    </div>
  );
}