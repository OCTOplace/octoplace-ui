import { Navbar } from "./Navbar";

export const Layout = ({ children }) => {
  const classes = {
    pages: {
        backgroundColor: "#000",
        width: "100%",
      },
      content: {
        justifyContent: "center",
        minHeight: "100vh",
        width: "100%",
      }
  };
  return (
    <div className={classes.pages}>
      <Navbar />
      <div className={classes.content}>{children}</div>
    </div>
  );
};
