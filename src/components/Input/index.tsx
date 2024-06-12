/* eslint-disable no-param-reassign */
import React, { forwardRef } from 'react';
import classNames from 'classnames';
import './index.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  errorText?: string;
  title?: string;
  tag?: 'input' | 'textarea';
  inputClassName?: string;
  autoGrow?: boolean;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      title,
      errorText,
      tag = 'input',
      className,
      inputClassName,
      autoGrow = true,
      ...rest
    },
    ref,
  ) => {
    const Component = tag as React.ElementType;

    return (
      <div className={classNames('input', className)} ref={ref}>
        <label className="input__label">
          <h4 className="input__title">{title}</h4>
          <Component
            className={classNames('input__field', inputClassName)}
            type="text"
            onInput={
              autoGrow
                ? (e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }
                : undefined
            }
            {...rest}
          />
          <small
            className={classNames(
              'input__error',
              !errorText && 'input__error--invisible',
            )}
          >
            <span className="input__error-icon">!</span>
            {errorText}
          </small>
        </label>
      </div>
    );
  },
);

Input.displayName = 'Input';
