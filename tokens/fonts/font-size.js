module.exports = theo => {

  theo.registerFormat("scss", result => {
    let { category } = result
      .get("props")
      .first()
      .toJS();
    return `
    $${category}-text-sizes: (
    ${result
      .get("props")
      .map(
        prop => `'${prop.get("name")}': (
          font-size: ${prop.getIn(["value", "font-size"])},
          font-weight: ${prop.getIn(["value", "font-weight"])},
          line-height: ${prop.getIn(["value", "line-height"])}
        ),`
      )
      .sort()
      .join("\n")}
    );
    `;
  });
};
