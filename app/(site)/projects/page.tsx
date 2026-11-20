import { REPOS, SITES } from "@/lib/projects";

const PROJECTS_CSS = `
    .projects-list li { margin-bottom: 8px; }
    .projects-list small { color: #888; }
    .project-tag { display: inline-block; margin-left: 6px; padding: 1px 8px; border: 1px solid #ccc; border-radius: 10px; font-size: 12px; color: #666; }
  `;

export default function ProjectsPage() {
  return (
    <>
      <div className="section-container">
        <div className="container">
          <div className="row">
            <div className="col-sm-8 col-sm-offset-2 section-container-spacer">
              <div className="text-center">
                <h1 className="h2">06 : Projects</h1>
                <p>Sites and code I&apos;ve built.</p>
              </div>
            </div>
            <div className="col-sm-8 col-sm-offset-2">
              <h3>All Repositories</h3>
              <p>
                <small>Sorted by commit count. Linked where the project has a live website.</small>
              </p>
              <ol className="projects-list">
                {REPOS.map((repo) => (
                  <li key={repo.name}>
                    {repo.website ? (
                      <a href={repo.website} target="_blank" rel="noopener">
                        {repo.name}
                      </a>
                    ) : (
                      repo.name
                    )}{" "}
                    <small>
                      {`· ${repo.commits} commit${repo.commits === 1 ? "" : "s"} · ${repo.private ? "private" : "public"}`}
                    </small>
                    {repo.apps?.length ? " " : null}
                    {repo.apps?.map((app) => (
                      <a key={app.url} className="project-tag" href={app.url} target="_blank" rel="noopener">
                        {app.label}
                      </a>
                    ))}
                  </li>
                ))}
              </ol>
              <h3>Sites</h3>
              <ul className="list-unstyled projects-list">
                {SITES.map((site) => (
                  <li key={site.url}>
                    <a href={site.url} target="_blank" rel="noopener">
                      {site.name}
                    </a>{" "}
                    <span className="project-tag">{site.tag}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: PROJECTS_CSS }} />
    </>
  );
}
