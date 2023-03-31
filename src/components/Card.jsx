export default function Card({ title, children, active }) {
  return (
    <div className="card shadow-xl bg-neutral-900 border-solid border-2 border-neutral-700 w-full">
      <div className="card-body">
        <h2 className={active ? "card-title text-white" : "card-title text-neutral-600"}>{title}</h2>
        {active && children}
      </div>
    </div>
  );
}
