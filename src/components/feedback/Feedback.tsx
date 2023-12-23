import React from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import { closeIcon, skipIcon, submitIcon } from "./icons";
import "./styles.scss";

export interface FeedbackProps {
  width?: number;
  height?: number;
  placement?: string;
  className?: string;
  styles?: React.CSSProperties;
  children?: React.ReactNode;
  zIndex?: number;
  disable?: boolean;
  onSubmit?: (
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => void;
  onClose?: (
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => void;
  open: boolean;
  isFeedbackFooter?: boolean;
  headingTitle?: string;
  closable?: boolean;
  isDarkMode?: boolean;
  darkModeBgColor?: string;
  darkModeColor?: string;

  overlay?: boolean;
  overlayClosable?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
}

const Feedback = (props: FeedbackProps) => {
  const {
    width = 285,
    height = 400,
    placement = "left",
    className,
    styles,
    children,
    zIndex = 1001,
    onClose,
    disable,
    onSubmit,
    open = false,
    isFeedbackFooter = true,
    headingTitle = "test",
    closable = true,
    isDarkMode = false,
    darkModeBgColor = "#111111",
    darkModeColor = "#212121",

    /** overlay */
    overlay = true,
    overlayClosable = true,
    overlayColor = "#000",
    overlayOpacity = 0.4,
  } = props;

  return (
    <>
      {createPortal(
        <div className="rf-feedback-wrapper">
          {/** =======feedback drawer======= */}
          <div
            className={classNames("rf-feedback", {
              "rf-open": open,
            })}
            style={{
              color: isDarkMode ? "#fff" : darkModeColor,
              width,
              height,
              background: isDarkMode ? darkModeBgColor : "#fff",
            }}
          >
            <div className="fr-feedback-body-wrapper">
              {/** =======feedback header======= */}
              <div
                className="fr-feedback-header"
                style={{
                  borderColor: isDarkMode ? darkModeColor : "#00000063",
                }}
              >
                <div>{headingTitle && <h3>{headingTitle}</h3>}</div>
                {/** =======feedback header close icon======= */}
                {closable && (
                  <div className="fr-close-icon" onClick={onClose}>
                    {closeIcon}
                  </div>
                )}
              </div>
              {/** =======feedback body======= */}
              <div className="fr-feedback-body">{children}</div>
              {/** =======feedback footer======= */}
              {isFeedbackFooter && (
                <div
                  className="fr-feedback-footer"
                  style={{
                    borderColor: isDarkMode ? darkModeColor : "#00000063",
                  }}
                >
                  <button onClick={onClose} className="fr-skip">
                    {skipIcon} <span>Skip</span>
                  </button>
                  <button
                    className="fr-submit"
                    onClick={onSubmit}
                    disabled={disable}
                  >
                    {submitIcon} <span>Submit</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          {/** =======overlay======= */}
          {overlay && (
            <div
              className={classNames("rf-overlay", {
                "rf-overlay-open": open,
              })}
              style={{
                background: overlayColor,
                opacity: overlayOpacity,
              }}
              onClick={overlayClosable && open ? onClose : undefined}
            ></div>
          )}
        </div>,
        document.body
      )}
    </>
  );
};

export default Feedback;
