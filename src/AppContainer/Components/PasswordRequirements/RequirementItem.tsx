export default const RequirementItem = observer(function RequirementItem({
  completed,
  label,
}: {
  completed: boolean;
  label: string;
}): JSX.Element {
  return (
    <div className="flex start gap-1 align-center">
      <div
        className={
          completed
            ? "completed-icon-container display-flex justify-center align-center"
            : "empty-icon-container display-flex justify-center align-center"
        }
        style={{ width: "15px", height: "15px" }}
      >
        {completed && (
          <img
            className="completed-icon"
            src="/assets/completed.png"
            style={{ width: "12px", height: "12px" }}
          />
        )}
      </div>
      <div className="small-text">{label}</div>
    </div>
  );
})
