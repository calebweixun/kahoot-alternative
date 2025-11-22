-- 1. Create the Quiz Set
do $$
declare
  new_quiz_id uuid;
begin
  insert into public.quiz_sets (name, description)
  values ('孟孟與小樂寶', '關於孟孟與小樂寶的趣味問答')
  returning id into new_quiz_id;

  -- 2. Add Questions

  -- Q1
  perform add_question(
    new_quiz_id,
    '請問孟孟多久發現小樂寶',
    1,
    array[
      '{"body": "一個半月", "is_correct": false}',
      '{"body": "兩個半月", "is_correct": false}',
      '{"body": "三個半月", "is_correct": false}',
      '{"body": "四個半月", "is_correct": true}'
    ]::json[]
  );

  -- Q2
  perform add_question(
    new_quiz_id,
    '請問三個半月孟孟做過什麼運動',
    2,
    array[
      '{"body": "暴打打羽球", "is_correct": false}',
      '{"body": "公園跑酷", "is_correct": false}',
      '{"body": "騎腳踏車", "is_correct": false}',
      '{"body": "以上皆是", "is_correct": true}'
    ]::json[]
  );

  -- Q3
  perform add_question(
    new_quiz_id,
    '孟孟孕徵有哪些',
    3,
    array[
      '{"body": "怕熱體質", "is_correct": false}',
      '{"body": "氣味靈敏", "is_correct": false}',
      '{"body": "無酸辣不歡", "is_correct": false}',
      '{"body": "以上皆是", "is_correct": true}'
    ]::json[]
  );

  -- Q4
  perform add_question(
    new_quiz_id,
    '孟孟肚子何時追上微醺的肚子',
    4,
    array[
      '{"body": "四個月", "is_correct": false}',
      '{"body": "五個月", "is_correct": false}',
      '{"body": "六個月", "is_correct": true}',
      '{"body": "七個月", "is_correct": false}'
    ]::json[]
  );

  -- Q5
  perform add_question(
    new_quiz_id,
    '孟孟預產期',
    5,
    array[
      '{"body": "二月", "is_correct": false}',
      '{"body": "三月", "is_correct": true}',
      '{"body": "四月", "is_correct": false}',
      '{"body": "五月", "is_correct": false}'
    ]::json[]
  );

end $$;
