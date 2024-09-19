"use client";

import React from "react";
import styles from "./ProfileInfo.module.scss";
import { useSession } from "next-auth/react";

const ProfileInfo: React.FC = () => {
  const { data: session } = useSession();

  return (
    <section>
      <div className="container">
        <h1 className={styles.title}>Профиль пользователя</h1>
        <div className={styles.userDetails}>
          <p>{session?.user.email}</p>
        </div>
      </div>
    </section>
  );
};

export default ProfileInfo;
