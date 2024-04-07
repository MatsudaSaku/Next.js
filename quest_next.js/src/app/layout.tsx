"use client";
import React, { useState, useEffect, ReactNode } from "react";
import Link from "next/link";

const useIsAuthenticated = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return isAuthenticated;
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isAuthenticated = useIsAuthenticated();
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <title>Conduit</title>
        <link
          href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
          rel="stylesheet"
        />
        <link
          href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="//demo.productionready.io/main.css" />
      </head>
      <body>
        <nav className="navbar navbar-light">
          <div className="container">
            <Link legacyBehavior href="/home" passHref>
              <a className="navbar-brand">conduit</a>
            </Link>
            <ul className="nav navbar-nav pull-xs-right">
              <li className="nav-item">
                <Link legacyBehavior href="/home" passHref>
                  <a className="nav-link active">Home</a>
                </Link>
              </li>
              {isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <Link legacyBehavior href="create/edit" passHref>
                      <a className="nav-link">
                        <i className="ion-compose"></i>&nbsp;New Article
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link legacyBehavior href="/settings" passHref>
                      <a className="nav-link">
                        <i className="ion-gear-a"></i>&nbsp;Settings
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link legacyBehavior href="/profile/eric-simons" passHref>
                      <a className="nav-link">Eric Simons</a>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link legacyBehavior href="/login" passHref>
                      <a className="nav-link">Sign in</a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link legacyBehavior href="/register" passHref>
                      <a className="nav-link">Sign up</a>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>

        {children}

        <footer>
          <div className="container">
            <Link href="/" passHref legacyBehavior>
              <a className="logo-font">conduit</a>
            </Link>
            <span className="attribution">
              An interactive learning project from{" "}
              <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
              licensed under MIT.
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
};

export default Layout;
