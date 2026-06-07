import type { Method } from "../data/methods";

type Props = {
  methods: Method[];
  activeId: string;
  onSelect: (id: string) => void;
};

function MethodTabs({ methods, activeId, onSelect }: Props) {
  if (methods.length === 0) {
    return (
      <div className="emptyState">
        <strong>No method found.</strong>
        <span>Try another search term or category.</span>
      </div>
    );
  }

  return (
    <div className="methodTabs">
      {methods.map((method, index) => (
        <button
          key={method.id}
          className={method.id === activeId ? "tab active" : "tab"}
          onClick={() => onSelect(method.id)}
        >
          <span className="tabNumber">{String(index + 1).padStart(2, "0")}</span>
          <span className="tabCategory">{method.category}</span>
          <strong>{method.title}</strong>
          <small>{method.status === "interactive" ? "interactive simulation" : "algorithmic note"}</small>
        </button>
      ))}
    </div>
  );
}

export default MethodTabs;
