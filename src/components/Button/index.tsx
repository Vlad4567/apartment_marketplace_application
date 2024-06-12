import classNames from 'classnames';
import './index.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<Props> = ({ children, className, ...rest }) => {
  return (
    <button className={classNames('button', className)} type="button" {...rest}>
      {children}
    </button>
  );
};
