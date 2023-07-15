import React from "react";
import styled from "styled-components";
import { device } from "@/styles/breakpoints";

// routes
import { toApps } from "@/routes/routes";

// components
import { Loader } from "@/components/ui-elements/_index";
import { ViewMoreBtn } from "@/components/btns/_index";
import { Project } from "./_index";

const HighlightedProjects = ({ projects }) => {
  return (
    <div>
      {!projects.length ? (
        <Loader />
      ) : (
        <Grid>
          {projects.slice(0, 24).map((p) => (
            <Project
              key={p.key}
              // ...
              name={p.data.name}
              slug={p.data.slug}
              logo={p.data.logo}
              categories={p.data.categories}
              canister={p.data.canister}
              github={p.data.github}
              description={p.data.description}
              // upvotes={p.data.upvotes}
            />
          ))}
        </Grid>
      )}

      <div>
        {projects.length > 0 && (
          <ViewMoreBtn nav={toApps}>view all {projects.length} projects</ViewMoreBtn>
        )}
      </div>
    </div>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
  gap: 1.5rem;
  margin-bottom: 1rem;

  @media ${device.laptop} {
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  }

  @media ${device.mobileL} {
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  }
`;

export default HighlightedProjects;
