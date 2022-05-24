describe("#BEHAVIOR | PRODUCT LIST SEARCH", () => {
  describe("Affichage de la liste", () => {
    it("affiche une liste de produit", () => {
      cy.visit("/products");
      cy.get(`[data-cy="product"]`).contains();
    });
  });
});
