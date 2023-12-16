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
  isFeedbackFooter: boolean;
  headingTitle: string;
  closable: boolean;
  mode: string;

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
    mode = "light",
    /** overlay */
    overlay = true,
    overlayClosable = true,
    overlayColor = "#000",
    overlayOpacity = 0.4,
  } = props;

  const isDark = mode === "light";

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
              color: isDark ? "#212121" : "#fff",
              width,
              height,
              background: isDark ? "#fff" : "#111111",
            }}
          >
            <div className="fr-feedback-body-wrapper">
              {/** =======feedback header======= */}
              <div className="fr-feedback-header">
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
                <div className="fr-feedback-footer">
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
