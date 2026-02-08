import type { ResourceItem } from "../lib/api";



export default function ResourceList({
  resources,
}: {
  resources: ResourceItem[];
}) {

  return (
    <div className="resourceList">
      {resources.slice(0, 5).map((r, i) => (
        <div key={`${r.name}-${i}`} className="resourceCard">
          <div className="resourceName">{r.name}</div>
          {r.description && <div className="resourceDesc">{r.description}</div>}
          <div className="resourceMeta">
            {r.phone && <div><strong>Phone:</strong> {r.phone}</div>}
            {r.location && <div><strong>Location:</strong> {r.location}</div>}
            {r.url && (
              <div>
                <strong>Link:</strong>{" "}
                <a href={r.url} target="_blank" rel="noreferrer">
                  {r.url}
                </a>
              </div>
            )}
          </div>
          {r.notes && <div className="resourceNotes">{r.notes}</div>}
        </div>
      ))}
    </div>
  );
}
