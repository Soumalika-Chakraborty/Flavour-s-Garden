import { db } from "../config/db";

export async function seedReference() {
  await db.query(`
    INSERT INTO tblReference VALUES
    ('OUT001','CAT01','REF01'),
    ('OUT001','CAT02','REF02'),
    ('OUT002','CAT04','REF03'),
    ('OUT002','CAT10','REF04'),
    ('OUT003','CAT07','REF05'),
    ('OUT004','CAT05','REF06'),
    ('OUT005','CAT09','REF07'),
    ('OUT006','CAT04','REF08'),
    ('OUT007','CAT10','REF09'),
    ('OUT001','CAT03','REF10');
  `);
}
