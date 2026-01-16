# Complete DynamoDB Tables List

Based on your WhiskeyBot application structure, here are all the tables you'll need. I've organized them by category for easier management.

## 📊 Total: 40+ Tables (20 core + 20+ logs/inventory)

---

## 🏢 Core Settings & Configuration (20 tables)

### Storage & Locations
1. **`warehouses`** - Warehouse locations and details
2. **`rackhouses`** - Rackhouse information for barrel storage

### Production Setup
3. **`mash_bills`** - Mash bill recipes and configurations
4. **`internal_spirit_types`** - Types of spirits (Bourbon, Vodka, etc.)
5. **`recipes`** - Production recipes
6. **`product_lines`** - Product line categories
7. **`product_masters`** - Master product definitions
8. **`mixed_product_masters`** - Mixed product configurations

### Raw Materials & Ingredients
9. **`raw_materials`** - Raw material inventory and details
10. **`raw_material_bom`** - Bill of Materials for raw materials
11. **`ttb_material_kinds`** - TTB material classifications

### Equipment
12. **`tanks`** - Tank inventory and specifications
13. **`fermenters`** - Fermenter inventory and specifications

### Tax & Compliance
14. **`whiskey_kinds`** - Whiskey type classifications
15. **`base_tax_rates`** - Tax rate configurations

### Business Entities
16. **`customers`** - Customer information
17. **`vendors`** - Vendor/supplier information
18. **`contacts`** - Contact information
19. **`dsps`** - Distilled Spirits Plants
20. **`owners`** - Owner information
21. **`linked_distilleries`** - Linked distillery relationships

---

## 🍺 Production & Operations (8 tables)

### Fermentation
22. **`fermentation_logs`** - Fermentation batch records
23. **`fermentation_cooks`** - Cook/fermentation run details
24. **`fermenter_status`** - Current status of fermenters
25. **`fermenter_moves`** - Fermenter transfer/move logs
26. **`fermentation_scrap_logs`** - Scrapped fermentation records

### Distillation
27. **`distillation_logs`** - Distillation run records
28. **`distillation_runs`** - Distillation batch details

### General
29. **`production_reports`** - Production reporting data

---

## 🛢️ Barrels & Aging (7 tables)

30. **`barrels`** - Main barrel inventory
31. **`barrel_fill_logs`** - Barrel filling records
32. **`barrel_history`** - Barrel lifecycle history
33. **`onsite_barrels`** - Onsite barrel inventory
34. **`offsite_barrels`** - Offsite barrel inventory
35. **`barrel_dumps`** - Barrel dump/empty records
36. **`rackhouse_inventory`** - Rackhouse barrel locations

---

## 📦 Starting Inventory (5 tables)

37. **`starting_raw_materials`** - Initial raw material inventory
38. **`starting_finished_goods`** - Initial finished goods inventory
39. **`starting_tanks`** - Initial tank inventory
40. **`starting_onsite_barrels`** - Initial onsite barrel inventory
41. **`starting_offsite_barrels`** - Initial offsite barrel inventory

---

## 💡 Recommended Approach

### Option 1: Create All Tables (Recommended for Full Functionality)

Create all 40+ tables. This gives you:
- ✅ Complete data separation
- ✅ Easy to query specific data types
- ✅ Better performance (smaller tables)
- ✅ Easier to manage permissions per table

**Time to create:** ~30-40 minutes (you can create multiple at once)

### Option 2: Consolidate Related Tables (Space Saver)

Group related data into fewer tables:

**Consolidated Structure:**
1. **`settings`** - All settings/config (warehouses, tanks, fermenters, etc.)
2. **`production_logs`** - All production logs (fermentation, distillation)
3. **`barrels`** - All barrel data (onsite, offsite, history)
4. **`inventory`** - All inventory (raw materials, finished goods, starting inventory)
5. **`business_entities`** - Customers, vendors, contacts, DSPs, owners

**Pros:** Fewer tables to manage
**Cons:** More complex queries, harder to scale

### Option 3: Start Small, Add as Needed (Recommended for MVP)

Create only the essential tables first:

**Phase 1 (Essential - 10 tables):**
1. `warehouses`
2. `mash_bills`
3. `internal_spirit_types`
4. `raw_materials`
5. `fermentation_logs`
6. `distillation_logs`
7. `barrels`
8. `customers`
9. `vendors`
10. `tanks`

**Phase 2 (Add as features are used):**
- Add remaining tables when you implement those features

---

## 🚀 Quick Creation Script

I can create a script to help you create all tables at once. Here's what you'd run in AWS Console or via AWS CLI:

### AWS CLI Script (Optional)

```bash
# Set your region
export AWS_REGION=us-east-1

# Create all dev tables
for table in warehouses rackhouses mash_bills internal_spirit_types recipes product_lines product_masters raw_materials tanks fermenters customers vendors contacts fermentation_logs distillation_logs barrels; do
  aws dynamodb create-table \
    --table-name dev_${table} \
    --attribute-definitions AttributeName=id,AttributeType=S \
    --key-schema AttributeName=id,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST \
    --region $AWS_REGION
done

# Create all prod tables (same structure)
for table in warehouses rackhouses mash_bills internal_spirit_types recipes product_lines product_masters raw_materials tanks fermenters customers vendors contacts fermentation_logs distillation_logs barrels; do
  aws dynamodb create-table \
    --table-name prod_${table} \
    --attribute-definitions AttributeName=id,AttributeType=S \
    --key-schema AttributeName=id,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST \
    --region $AWS_REGION
done
```

---

## 📋 Recommended Table Creation Order

### Priority 1: Core Functionality (Create First)
1. `warehouses`
2. `mash_bills`
3. `internal_spirit_types`
4. `raw_materials`
5. `fermentation_logs`
6. `distillation_logs`
7. `barrels`

### Priority 2: Production Features
8. `tanks`
9. `fermenters`
10. `recipes`
11. `product_masters`
12. `fermenter_status`
13. `fermenter_moves`

### Priority 3: Business Operations
14. `customers`
15. `vendors`
16. `contacts`
17. `rackhouses`

### Priority 4: Advanced Features
18. All remaining tables as you implement features

---

## 💰 Cost Estimate

**Free Tier Coverage:**
- 25 GB storage total (across all tables)
- 25 read/write capacity units per month

**For 40 tables with small data:**
- Storage: ~1-2 GB (well within free tier)
- Requests: Depends on usage, but likely within free tier for development

**Estimated monthly cost after free tier:**
- Small app (< 1,000 users): $0-5/month
- Medium app (1,000-10,000 users): $5-25/month
- Large app (10,000+ users): $25-100/month

---

## 🎯 My Recommendation

**Start with Option 3 (Start Small):**

1. **Create 10 essential tables** (dev + prod = 20 tables total)
2. **Test your app** with these core features
3. **Add tables incrementally** as you build out features
4. **Monitor usage** and costs in AWS Console

This approach:
- ✅ Gets you started quickly (10-15 minutes)
- ✅ Keeps costs minimal
- ✅ Lets you learn DynamoDB gradually
- ✅ Easy to add more tables later

Would you like me to create a script to help you create the essential 10 tables first?

