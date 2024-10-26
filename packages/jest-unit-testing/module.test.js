import mut from './module.js'; // MUT = Module Under Test

test('Testing sum -- success', () => {
  const expected = 30;
  const got = mut.sum(12, 18);
  expect(got).toBe(expected);
});

//Div testing
test('Testing div -- success',()=>{
    const expected = 10;
    const got = mut.div(20,2);
    expect(got).toBe(expected);
});
 test('Testing div by zero -- fail', () => {
    
    const got = mut.div(20,0)
    const expected = Infinity
    expect(got).toBe(expected);
 });
 test('Testing rational number -- fail', () => {
    const got = mut.div(1/2);
    const expected = NaN;
    expect(got).toBe(expected);

 });
 test('testing improper fraction -- fail',() =>{
    const got = mut.div(3/2);
    const expected = NaN;
    expect(got).toBe(expected);

 });
 test('testing decimal -- fail',() => {
    const got = mut.div(1.2/1.3);
    const expected = NaN;
    expect(got).toBe(expected);

 });
 test('testing letters -- fail', () => {
    const got = mut.div("a","b");
    const expected = NaN;
    expect(got).toBe(expected);

 });
//Testing done 

//Testing with contains letters
test('testing for numbers -- success', ()=> {

    const got = mut.containsNumbers("arente15");
    const expected = true;
    expect(got).toBe(expected);
});
test('testing only number -- success',()=>{
    const got = mut.containsNumbers("15");
    const expected = true;
    expect(got).toBe(expected)
});
test('testing for negative numbers -- success', ()=>{
    //is only checking for digits but can't tell
    //of the special signs
    const got = mut.containsNumbers("lol-15");
    const expected = true;
    expect(got).toBe(expected);
});
test('testing for string -- fail', ()=>{
    const got = mut.containsNumbers("Name");
    const expected = false;
    expect(got).toBe(expected);
});
test('testing for empty string no white space -- fail', () =>{
    const got = mut.containsNumbers("");
    const expected = false;
    expect(got).toBe(expected);

})
//Bug is it has no numbers and only white space and should return false 
test('testing for empty white space should:BUG returns true when it should be false -- fail', () =>{
    const got = mut.containsNumbers(" ");
    const expected = false;
    expect(got).toBe(expected,"Expected to fail but returns true");

})
test('testing for space -- success', () =>{
    const got = mut.containsNumbers(" true4");
    const expected = true;
    expect(got).toBe(expected);

})
test('testing for special characters -- fail', () =>{
    const got = mut.containsNumbers("`-=+&*^2%#$");
    const expected = true;
    expect(got).toBe(expected);

})




