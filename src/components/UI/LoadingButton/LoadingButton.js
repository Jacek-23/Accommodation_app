export default function LoadingButton(props) {
  const className = props.className || 'btn-primary';

  const buttonProps = {...props};
  delete buttonProps.loading;

  return props.loading
    ? (
      <button className={`btn mt-3 ${className}`} type="button" disabled>
        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <span className="sr-only">Ładowanie...</span>
      </button>
    )
    : <button {...buttonProps} className={`btn mt-3 ${className}`}>{props.children}</button>
}