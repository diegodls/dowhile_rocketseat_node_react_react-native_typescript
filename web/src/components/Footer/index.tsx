import { VscGithubInverted } from "react-icons/vsc";

import styles from "./styles.module.scss";

export function Footer() {
  return (
    <>
      <div className={styles.container}>
        <a href='https://github.com/diegodls' target='_blank'>
          <VscGithubInverted size='16' />
          <p>diegodls</p>
        </a>
      </div>
    </>
  );
}
