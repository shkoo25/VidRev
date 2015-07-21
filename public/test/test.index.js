describe("Suite", function(){
  
  describe("Section", function(){

    it("x is globally defined", function(){

      expect(x).to.be.defined

    })

    it("x is a function", function(){

      expect(x).to.be.a("function")

    })

  })

})