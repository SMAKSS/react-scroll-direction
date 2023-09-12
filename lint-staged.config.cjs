module.exports = {
  "*.+(js|jsx|ts|tsx)": ["yarn lint", () => "yarn typecheck"],
  "*.+(js|jsx|json|yml|yaml|css|ts|tsx|md|graphql|mdx)": ["yarn format"],
};
