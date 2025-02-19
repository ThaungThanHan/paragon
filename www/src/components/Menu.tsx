import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, graphql, useStaticQuery } from 'gatsby';
import {
  Tooltip,
  OverlayTrigger,
  Button,
  Badge,
  Collapsible,
  Hyperlink,
  ButtonGroup,
} from '~paragon-react';
import Search from './Search';
import { SettingsContext } from '../context/SettingsContext';
import { THEMES } from '../../theme-config';

// MDX transforms markdown generated by gatsby-transformer-react-docgen
// This query filters out all of those markdown nodes and assumes all others
// are for page creation purposes.
const menuQuery = graphql`
  query menuQuery {
    components: allMdx(
      filter: {
        parent: {
          internal: { owner: { nin: "gatsby-transformer-react-docgen" } }
        }
        frontmatter: { type: {} }
      }
      sort: { fields: frontmatter___title }
    ) {
      categories: group(field: frontmatter___categories) {
        nodes {
          ...ComponentPage
        }
        fieldValue
      }
      types: group(field: frontmatter___type) {
        nodes {
          ...ComponentPage
        }
        fieldValue
      }
    }
  }

  fragment ComponentPage on Mdx {
    id
    frontmatter {
      categories
      type
      title
      status
    }
    fields {
      slug
    }
  }
`;

export interface IComponentNavItem {
  id: string,
  fields: { slug: string },
  frontmatter: {
    categories: Array<string>,
    title: string,
    type: string,
    status?: string,
  },
}

export function ComponentNavItem({
  id, fields, frontmatter, ...props
}: IComponentNavItem) {
  const isDeprecated = frontmatter?.status?.toLowerCase().includes('deprecate') || false;
  const linkNode = isDeprecated ? (
    <OverlayTrigger
      placement="right"
      overlay={<Tooltip id={`tooltip-deprecated-${id}`}>Deprecated</Tooltip>}
    >
      <Link className="text-muted" to={fields.slug}>{frontmatter.title}</Link>
    </OverlayTrigger>
  ) : (
    <Link to={fields.slug}>{frontmatter.title}</Link>
  );

  return (
    <li {...props} className="d-flex align-items-center">
      {linkNode}
    </li>
  );
}

ComponentNavItem.propTypes = {
  id: PropTypes.string.isRequired,
  fields: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }).isRequired,
  frontmatter: PropTypes.shape({
    title: PropTypes.string.isRequired,
    status: PropTypes.string,
  }).isRequired,
};

export type MenuComponentListTypes = {
  children: React.ReactNode,
};

function MenuComponentList({ children }: MenuComponentListTypes) {
  return (
    <div className="pgn-doc__menu-component-list">{children}</div>
  );
}

MenuComponentList.propTypes = {
  children: PropTypes.node.isRequired,
};

export interface IMenuComponentListCategory {
  children: React.ReactNode,
  title: string,
}

function MenuComponentListCategory({ children, title }: IMenuComponentListCategory) {
  return (
    <div className="pgn-doc__menu-component-list-category">
      <h3 className="h4">{title}</h3>
      {children}
    </div>
  );
}

const handlePlaygroundClick = () => {
  global.analytics.track('openedx.paragon.docs.menu.playground.visit_playground.clicked');
};

MenuComponentListCategory.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

interface IMenuQueryComponents {
  categories: Array<{
    fieldValue: string,
    nodes: Array<IComponentNavItem>,
  }>,
  all: Array<IComponentNavItem>
}

const foundationLinks = [
  'Colors', 'Elevation', 'Typography', 'Layout', 'Spacing', 'Icons', 'CSS-Utilities', 'Responsive', 'Brand-icons',
];

function Menu() {
  const {
    settings,
    handleSettingsChange,
  } = useContext(SettingsContext);
  const { components } = useStaticQuery(menuQuery);
  const { categories }: IMenuQueryComponents = components;

  return (
    <div className="pgn-doc__menu">
      <h2 className="pgn-doc__menu-title">Theme</h2>
      <div className="pgn-doc__menu-btn--group">
        <ButtonGroup>
          {THEMES.map(({ id, label }) => (
            <Button
              key={id}
              variant={settings.theme === id ? 'primary' : 'outline-primary'}
              size="sm"
              onClick={() => handleSettingsChange('theme', id)}
              {...settings.theme === id ? { 'data-autofocus': true } : {}}
            >
              {label}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      <Search />
      <div className="pgn-doc__menu-items">
        <Collapsible
          styling="basic"
          title="Guides"
        >
          <ul className="list-unstyled">
            <li>
              <Link to="/guides/installation-and-usage">
                Getting started
              </Link>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://openedx.atlassian.net/wiki/spaces/BPL/pages/1773502564/Component+Contribution+Process"
              >
                Contributing
              </a>
            </li>
          </ul>
        </Collapsible>
        <Collapsible
          styling="basic"
          title="Foundations"
        >
          <ul className="list-unstyled foundations-list">
            {foundationLinks.map(link => (
              <li key={link}>
                <Link to={`/foundations/${link.toLowerCase().trim()}`}>{link.replace(/-/g, ' ')}</Link>
              </li>
            ))}
          </ul>
        </Collapsible>
        <Collapsible
          styling="basic"
          title="Tools"
        >
          <ul className="list-unstyled foundations-list">
            <li>
              <Link to="/insights">Usage Insights</Link>
            </li>
            <li>
              <Link to="/playground" onClick={handlePlaygroundClick}>
                Playground
                <Badge className="ml-1" variant="warning">Beta</Badge>
              </Link>
            </li>
            <li>
              <Link to="/tools/component-generator">Component Generator</Link>
            </li>
          </ul>
        </Collapsible>
        <MenuComponentList>
          {categories.map(({ fieldValue, nodes }) => (
            <Collapsible
              className="pgn-doc__menu-component--list-category"
              key={fieldValue}
              styling="basic"
              title={fieldValue}
            >
              <ul className="list-unstyled">
                {nodes.map((node) => <ComponentNavItem key={node.id} {...node} />)}
              </ul>
            </Collapsible>
          ))}
        </MenuComponentList>
      </div>
      <Hyperlink
        destination="https://www.npmjs.com/package/@edx/paragon"
        externalLinkAlternativeText="npm Paragon package page"
        externalLinkTitle="Paragon npm"
        target="_blank"
      >
        <img
          className="d-inline-block mr-2"
          src="https://img.shields.io/npm/v/@edx/paragon.svg"
          alt="npm_version"
          width={94}
          height={20}
        />
      </Hyperlink>
    </div>
  );
}

export default Menu;
