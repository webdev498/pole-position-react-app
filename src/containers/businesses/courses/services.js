export const orderCourses = (collection = []) => collection.sort((a,b) => a.id - b.id)

export const getCourseById = (collection = [], id=0) => {
  const list = collection.filter(c => c.id === id);
  return list.length > 0 ? list[0] : null;
};

export const updateCourseList = (collection = [], course={}) =>
  collection.reduce((accum, cur) =>
    accum.concat(cur.id === course.id ? course : cur), []);
