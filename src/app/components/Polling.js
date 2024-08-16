"use client";
import React, { useEffect, useState, useRef } from "react";

const PollingComponent = () => {
  const [topics, setTopics] = useState([]);
  const previousTopics = useRef([]);
  const isFirstLoad = useRef(true); // 초기 로딩 여부를 확인하는 ref

  useEffect(() => {
    // 사용자에게 알림 권한 요청
    const requestNotificationPermission = async () => {
      if (Notification.permission !== "granted") {
        await Notification.requestPermission();
      }
    };

    requestNotificationPermission(); // 권한 요청

    const fetchTopics = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}topics`
        ); // json-server API 주소
        const data = await response.json();

        // 새로운 토픽 확인
        const newTopics = data.filter(
          (topic) =>
            !previousTopics.current.find((prev) => prev.id === topic.id)
        );

        if (!isFirstLoad.current && newTopics.length > 0) {
          // 첫 로딩이 아니고, 새로운 토픽이 있을 때 알림
          new Notification("알림✉️", {
            body: "새로운 일상이 추가되었습니다.",
            icon: "/bell.png",
          });
        }

        // 토픽 상태 업데이트 및 이전 토픽 업데이트
        setTopics(data);
        previousTopics.current = data;

        // 첫 로딩 후 상태 변경
        isFirstLoad.current = false;
      } catch (error) {
        console.error("Polling Error:", error);
      }

      // 데이터 가져오기 후 다시 호출
      setTimeout(fetchTopics, 5000); // 5초마다 호출
    };

    fetchTopics(); // 초기 호출

    // 컴포넌트가 언마운트될 때 타이머 정리
    return () => clearTimeout(fetchTopics);
  }, []);

  return <div></div>;
};

export default PollingComponent;
