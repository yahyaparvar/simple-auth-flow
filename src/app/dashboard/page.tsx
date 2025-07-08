"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";

import Button from "@/components/button";
import type { User } from "@/types/user";
import styles from "./Dashboard.module.scss";

const FALLBACK_IMAGE = "/fallback_profile.jpg";

const DashboardPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [imageSrc, setImageSrc] = useState<string>(FALLBACK_IMAGE);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/auth");
      return;
    }
    try {
      const parsedUser: User = JSON.parse(storedUser);
      setUser(parsedUser);

      if (parsedUser?.picture?.medium) {
        setImageSrc(parsedUser.picture.medium);
      }
    } catch {
      router.push("/auth");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/auth");
  };

  if (!user) return null;

  return (
    <div className={styles.wrapper}>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <Image
            src={imageSrc}
            alt="profile"
            width={100}
            height={100}
            className={styles.avatar}
            onError={() => setImageSrc(FALLBACK_IMAGE)}
          />
        </motion.div>

        <motion.h1
          className={styles.welcome}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          خوش اومدی {user.name.first} جان!
        </motion.h1>

        <Button size="medium" variant="secondary" onClick={handleLogout}>
          <FiLogOut className={styles.icon} /> Logout
        </Button>
      </motion.div>
    </div>
  );
};

export default DashboardPage;
