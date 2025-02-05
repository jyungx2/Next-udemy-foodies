// "use client"; // client component는 가장 작은 범위로 가장 적은 컴포넌트에 한해 설정하는게 이득!
// 서버 측에 렌더링되면서 얻는 이점들을 사용하기 위해 최대한 React Server Component로 유지하자!
// 따라서 navigation 바를 만들 때 사용되는 usePathnam()을 위해 메인헤더를 Client Component로 만들지 말고, <Link>를 출력하는 컴포넌트를 따로 만들어서 분리시키는 방향으로 가자!!

import Link from "next/link";
import logoImg from "@/assets/logo.png";
import classes from "./main-header.module.css";
import Image from "next/image";
import MainHeaderBackground from "@/components/main-header/main-header-background";
import NavLink from "@/components/main-header/nav-link";

export default function MainHeader() {
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <Image src={logoImg} alt="A plate with food on it" priority />
          NextLevel Food
        </Link>

        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>

            <li>
              <NavLink href="/community">Browse Meals</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
