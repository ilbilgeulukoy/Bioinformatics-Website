import type { Method } from "../data/methods";
import { methodNotesById } from "../data/methodNotes";
import { referencesByMethod } from "../data/references";
import ExactPatternSimulator from "./simulations/ExactPatternSimulator";
import ApproximatePatternSimulator from "./simulations/ApproximatePatternSimulator";
import HammingDistanceSimulator from "./simulations/HammingDistanceSimulator";
import NeighborhoodSimulator from "./simulations/NeighborhoodSimulator";
import ExpectedKmerSimulator from "./simulations/ExpectedKmerSimulator";
import EntropySimulator from "./simulations/EntropySimulator";
import SkewSimulator from "./simulations/SkewSimulator";
import PalindromeSimulator from "./simulations/PalindromeSimulator";

type Props = {
  method: Method;
};

function renderSimulation(id: string) {
  if (id === "exact-pattern") return <ExactPatternSimulator />;
  if (id === "approx-pattern") return <ApproximatePatternSimulator />;
  if (id === "hamming") return <HammingDistanceSimulator />;
  if (id === "neighborhood") return <NeighborhoodSimulator />;
  if (id === "expected-kmer") return <ExpectedKmerSimulator />;
  if (id === "entropy") return <EntropySimulator />;
  if (id === "skew") return <SkewSimulator />;
  if (id === "palindrome") return <PalindromeSimulator />;

  const note = methodNotesById[id];

  return (
    <div className="algorithmNoteCard">
      <p className="miniTitle">Algorithmic summary</p>

      {note?.formula && (
        <div className="formulaStrip">
          <strong>Formula</strong>
          <span>{note.formula}</span>
        </div>
      )}

      <div className="stepList">
        {note?.steps.map((step, index) => (
          <div className="stepItem" key={step}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>{step}</p>
          </div>
        ))}
      </div>

      {note?.complexity && (
        <div className="complexityBox">
          <strong>Computational cost</strong>
          <span>{note.complexity}</span>
        </div>
      )}
    </div>
  );
}

function MethodDetail({ method }: Props) {
  const references = referencesByMethod[method.id] || [];
  const note = methodNotesById[method.id];

  return (
    <section id="detail" className="detail">
      <div className="detailHeader">
        <div>
          <p className="sectionTag">{method.category}</p>
          <h2>{method.title}</h2>
        </div>

        <a
          className="sourceButton"
          href={"https://github.com/ilbilgeulukoy/bioinfo-algorithms/blob/main/" + method.file}
          target="_blank"
          rel="noreferrer"
        >
          Python source
        </a>
      </div>

      <div className="detailBadgeRow">
        <span>{method.status === "interactive" ? "Interactive simulation available" : "Algorithmic note"}</span>
        <span>{method.file}</span>
      </div>

      <div className="detailLayout">
        <article className="methodText">
          <div className="textBlock">
            <h3>Definition</h3>
            <p>{method.definition}</p>
          </div>

          <div className="textBlock">
            <h3>Biological or computational relevance</h3>
            <p>{method.relevance}</p>
          </div>

          <div className="textBlock">
            <h3>Algorithmic formulation</h3>
            <p>{method.algorithmicIdea}</p>
          </div>

          <div className="ioGrid">
            <div>
              <strong>Input</strong>
              <span>{method.input}</span>
            </div>

            <div>
              <strong>Output</strong>
              <span>{method.output}</span>
            </div>
          </div>
        </article>

        <div className="simulationArea">{renderSimulation(method.id)}</div>
      </div>

      {note && (
        <div className="assumptionSection">
          <div className="assumptionCard">
            <p className="miniTitle">Assumptions</p>
            <ul>
              {note.assumptions.map((assumption) => (
                <li key={assumption}>{assumption}</li>
              ))}
            </ul>
          </div>

          <div className="glossaryCard">
            <p className="miniTitle">Glossary</p>
            <div className="glossaryGrid">
              {note.glossary.map((item) => (
                <div key={item.term}>
                  <strong>{item.term}</strong>
                  <span>{item.definition}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="referenceSection">
        <div className="referenceHeader">
          <p className="sectionTag">Scientific references</p>
          <h3>Literature supporting this method</h3>
        </div>

        <div className="referenceGrid">
          {references.map((reference) => (
            <a
              className="referenceCard"
              href={reference.url}
              target="_blank"
              rel="noreferrer"
              key={reference.title}
            >
              <span>{reference.source}</span>
              <strong>{reference.title}</strong>
              <em>{reference.authors}</em>
              <p>{reference.note}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MethodDetail;
