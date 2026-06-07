import { useMemo, useState } from "react";
import { methods } from "../data/methods";
import MethodTabs from "./MethodTabs";
import MethodDetail from "./MethodDetail";

const categories = ["All", ...Array.from(new Set(methods.map((method) => method.category)))];

function MethodPanel() {
  const [activeId, setActiveId] = useState(methods[0].id);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filteredMethods = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return methods.filter((method) => {
      const matchesCategory = category === "All" || method.category === category;
      const searchableText = [
        method.title,
        method.category,
        method.definition,
        method.algorithmicIdea,
        method.file,
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && searchableText.includes(normalizedQuery);
    });
  }, [query, category]);

  const activeMethod = methods.find((method) => method.id === activeId) || methods[0];

  function handleSelect(id: string) {
    setActiveId(id);

    window.setTimeout(() => {
      document.getElementById("detail")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 80);
  }

  return (
    <>
      <section id="methods" className="methods">
        <div className="sectionHeader">
          <div>
            <p className="sectionTag">Method index</p>
            <h2>Foundational sequence-analysis methods</h2>
          </div>

          <p>
            Methods are grouped by computational task. Select a method to inspect
            its definition, input-output structure, algorithmic formulation, and
            available simulation.
          </p>
        </div>

        <div className="methodTools">
          <label className="searchBox">
            Search methods
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="e.g. entropy, motif, skew, hamming"
            />
          </label>

          <div className="categoryFilters" aria-label="Method categories">
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? "filterChip active" : "filterChip"}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="methodMeta">
          <span>{filteredMethods.length} displayed methods</span>
          <span>{methods.filter((method) => method.status === "interactive").length} interactive simulations</span>
          <span>{methods.length} Python-linked entries</span>
        </div>

        <MethodTabs
          methods={filteredMethods}
          activeId={activeId}
          onSelect={handleSelect}
        />
      </section>

      <MethodDetail method={activeMethod} />
    </>
  );
}

export default MethodPanel;
