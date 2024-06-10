import './index.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <main className="not-found-page">
      <div className="not-found-page__wrapper">
        <h2 className="not-found-page__text">404</h2>
        <div className="not-found-page__divider"></div>
        <h2 className="not-found-page__text">Not Found</h2>
      </div>
    </main>
  );
};
