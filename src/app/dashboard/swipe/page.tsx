import { SwipeBrowseLayout } from "@/components/dashboard/SwipeBrowseLayout/SwipeBrowseLayout";
import styles from "./page.module.css";

export default function SwipePage() {
  return (
    <main className={styles.main}>
      <SwipeBrowseLayout />
    </main>
  );
}
