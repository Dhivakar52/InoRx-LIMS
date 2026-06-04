export const getDeltaRows = (
  items: any[],
  entity: string
) => {
  const rows: any[] = [];

  items.forEach((item) => {
    if (item.actionType === 1) {
      rows.push({
        entity,
        name:
          item.armName ||
          item.visitName ||
          item.specimenType ||
          item.testName,
        changeType: "Added",
      });
    }

    if (item.actionType === 2) {
      rows.push({
        entity,
        name:
          item.armName ||
          item.visitName ||
          item.specimenType ||
          item.testName,
        changeType:
          "Modified",
      });
    }

    if (item.actionType === 3) {
      rows.push({
        entity,
        name:
          item.armName ||
          item.visitName ||
          item.specimenType ||
          item.testName,
        changeType: "Deleted",
      });
    }
  });

  return rows;
};