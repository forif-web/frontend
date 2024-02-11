import { MilestoneType } from "@/app/types/milestone";
import styles from "./milestone-styles.module.css";
export default function Milestone({
  milestoneData,
}: {
  milestoneData: MilestoneType;
}) {
  return (
    <ul className={styles.milestone}>
      {milestoneData.data.map((val, index) => (
        <li
          key={val.year}
          className={`${
            index === milestoneData.data.length - 1 ? styles.lastItem : ""
          }`}
        >
          <div className="wrap_cont">
            <strong>{val.year}</strong>
            <div className="inner_cont">
              {val.events.map((event) => (
                <div
                  key={`${val.year}-${event.month}`}
                  className="flex justify-start"
                >
                  <em>{event.month}월</em>
                  <div className="ml-9">
                    <ul className={styles.milestone_link}>
                      {event.details.map((detail, idx) => (
                        <li key={`${val.year}-${event.month}-${idx}`}>
                          {detail.event}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
